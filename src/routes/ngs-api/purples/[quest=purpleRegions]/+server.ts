import sql from 'mssql';
import { Weapon, parseWeapon } from '$lib/types/api/weapon';
import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { type InferType, string, number, object, array } from 'yup';
import { notifyDiscordNewRunSubmitted } from '$lib/server/discordNotify';
import { normalizeYoutubeLink, youtubeUrlRegex } from '$lib/utils/youtube';
import { jsonError } from '$lib/server/error.js';
import { weaponsToDbValMap } from '$lib/server/db/util/weaponType.js';

const purpleRequestSchema = object({
	userId: string().required(),
	username: string().required(),
	region: string().required(),
	serverRegion: string().required(),
	rank: number().required(),
	notes: string().max(500).nullable(),
	time: object({
		hours: number().required(),
		minutes: number().required(),
		seconds: number().required()
	}),
	players: array(
		object({
			playerId: number().nullable(),
			povVideoLink: string()
				.matches(youtubeUrlRegex, (w) => `${w.path} must a valid youtube link`)
				.nullable()
				.max(128),
			playerName: string().required(),
			inVideoName: string().required(),
			playerServer: string().nullable(),
			mainClass: string().required(),
			subClass: string().required(),
			weapons: array(
				string()
					.required()
					.test(
						'known_weapon',
						(w) => `${w.path} must be a valid weapon type`,
						(w) => !!parseWeapon(w.toLowerCase())
					)
			)
				.max(6)
				.required()
		})
	)
		.min(1)
		.max(4)
		.test('has_video', 'At least one player must have a video', (players) =>
			players?.some((p) => p.povVideoLink !== undefined)
		)
		.test(
			'player1_has_id',
			'Player 1 must be an existing user',
			(players) => players?.at(0)?.playerId !== undefined
		)
		.test('solo_requires_weapon', 'Solo requires at least 1 weapon used', (players) =>
			players?.length == 1 ? players?.at(0)?.weapons[0] !== undefined : true
		)
		.required()
});

type PurpleRunRequest = InferType<typeof purpleRequestSchema>;

// For webhook notify
const partyTypeMap: { [key: number]: string } = {
	1: 'Solo',
	2: 'Duo',
	3: 'Party',
	4: 'Party'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, request }) {
	const quest = params.quest ?? '';

	// Validate request
	const body = await request.json();
	let parsedRun: PurpleRunRequest;
	try {
		parsedRun = await purpleRequestSchema.validate(body);
	} catch (err: any) {
		return jsonError(400, {
			error: 'bad_request',
			details: err.errors
		});
	}
	if (!parsedRun) {
		return jsonError(400, { error: 'json_parse_error' });
	}

	// Transform data
	parsedRun.region = quest.toLowerCase();
	parsedRun.players.forEach((p) => {
		p.povVideoLink = p.povVideoLink ? normalizeYoutubeLink(p.povVideoLink) : null;
		p.weapons = p.weapons.map((w) => weaponsToDbValMap[parseWeapon(w) ?? '']);
	});

	// Check run data
	const validationErrors = await checkRunData(parsedRun);
	if (validationErrors.length > 0) {
		return jsonError(400, { error: 'bad_request', details: validationErrors });
	}

	// Insert run
	try {
		if (parsedRun.players.length == 1) {
			await insertSoloRun(parsedRun);
		} else {
			await insertPartyRun(parsedRun);
		}

		const player1Name = parsedRun.username;
		const questName = quest.charAt(0).toUpperCase() + quest.slice(1);
		const partyType = partyTypeMap[parsedRun.players.length] ?? '';
		notifyDiscordNewRunSubmitted(player1Name, `${questName} Purple (${partyType})`);
		return json({ data: 'success' });
	} catch (err) {
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
}

const checkRunData = async (run: PurpleRunRequest) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	// Video links not already in use
	const videoLinks = run.players
		.map((p) => p.povVideoLink)
		.filter((l): l is string => l !== undefined);

	let videoLinkRequest = pool.request();

	const paramNames: string[] = [];
	videoLinks.forEach((l, i) => {
		const paramName = `link${i}`;
		paramNames.push(paramName);
		videoLinkRequest = videoLinkRequest.input(paramName, l);
	});

	const paramList = paramNames.map((p) => `@${p}`);
	const videoLinksResults = await videoLinkRequest.query(`
		SELECT Link 
			FROM Submissions.Pending 
			WHERE Link IN (${paramList.join(',')})
		UNION
		SELECT P1Link
			FROM Submissions.Party
			WHERE P1Link IN (${paramList.join(',')})
		UNION
		SELECT P2Link
			FROM Submissions.Party
			WHERE P2Link IN (${paramList.join(',')})
		UNION
		SELECT P3Link
			FROM Submissions.Party
			WHERE P3Link IN (${paramList.join(',')})
		UNION
		SELECT P4Link
			FROM Submissions.Party
			WHERE P4Link IN (${paramList.join(',')});`);

	if (videoLinksResults.recordset.length > 0) {
		const videosInUse = videoLinksResults.recordset.map((r) => r.Link as string);
		videosInUse.forEach((l) => {
			errorList.push(`Video already used in another run. VideoUrl=${l}`);
		});
	}

	return errorList;
};

const insertSoloRun = async (run: PurpleRunRequest) => {
	const pool = await leaderboardDb.connect();

	// Get player info
	const player1 = run.players[0];

	const runTime = serializeTimeToSqlTime(run.time);

	const submissionTime = new Date();

	let request = pool
		.request()
		.input('playerID', sql.Int, player1.playerId)
		.input('runCharacter', sql.NVarChar, player1.inVideoName)
		.input('patch', sql.NVarChar, 'pot6r')
		.input('region', sql.NVarChar, run.region)
		.input('rank', sql.Int, run.rank)
		.input('time', sql.NVarChar, runTime)
		.input('mainClass', sql.NVarChar, player1.mainClass)
		.input('subClass', sql.NVarChar, player1.subClass)
		.input('link', sql.NVarChar, player1.povVideoLink)
		.input('notes', sql.NVarChar, run.notes)
		.input('submissionTime', sql.DateTime, submissionTime)
		.input('submitterID', sql.Int, player1.playerId)
		.input('w1', sql.NVarChar, player1.weapons[0])
		.input('w2', sql.NVarChar, player1.weapons[1])
		.input('w3', sql.NVarChar, player1.weapons[2])
		.input('w4', sql.NVarChar, player1.weapons[3])
		.input('w5', sql.NVarChar, player1.weapons[4])
		.input('w6', sql.NVarChar, player1.weapons[5]);

	const result = await request.query(
		`INSERT INTO 
		 Submissions.Pending (PlayerID,RunCharacter,Patch,Region,Rank,Time,MainClass,SubClass,W1,W2,W3,W4,W5,W6,Link,Notes,SubmissionTime,SubmitterID)
		 VALUES (@playerID,@runCharacter,@patch,@region,@rank,@time,@mainClass,@subClass,@w1,@w2,@w3,@w4,@w5,@w6,@link,@notes,@submissionTime,@submitterID);
		`
	);

	if (result.rowsAffected[0] == 0) {
		throw Error(`Purple Solo Run insertion failed. Submission from ${run.username}`);
	}
};

const insertPartyRun = async (run: PurpleRunRequest) => {
	const pool = await leaderboardDb.connect();

	// Get player info
	const player1 = run.players[0];
	const player2 = run.players[1];
	const player3 = run.players[2];
	const player4 = run.players[3];

	const runTime = serializeTimeToSqlTime(run.time);

	const submissionTime = new Date();

	let request = pool
		.request()
		.input('patch', sql.NVarChar, 'pot6r')
		.input('region', sql.NVarChar, run.region)
		.input('rank', sql.Int, run.rank)
		.input('time', sql.NVarChar, runTime)
		.input('subtime', sql.DateTime, submissionTime)
		.input('subpid', sql.Int, player1.playerId)
		.input('serverid', sql.NVarChar, run.serverRegion)
		.input('notes', sql.NVarChar, run.notes)
		.input('partysize', sql.Int, run.players.length);

	request = request
		.input('p1pid', sql.Int, player1.playerId)
		.input('p1rc', sql.NVarChar, player1.inVideoName)
		.input('p1mc', sql.NVarChar, player1.mainClass)
		.input('p1sc', sql.NVarChar, player1.subClass)
		.input('p1link', sql.NVarChar, player1.povVideoLink);

	request = request
		.input('p2pid', sql.Int, player2.playerId)
		.input('p2rc', sql.NVarChar, player2.inVideoName)
		.input('p2mc', sql.NVarChar, player2.mainClass)
		.input('p2sc', sql.NVarChar, player2.subClass)
		.input('p2link', sql.NVarChar, player2.povVideoLink);

	request = request
		.input('p3pid', sql.Int, player3?.playerId)
		.input('p3rc', sql.NVarChar, player3?.inVideoName)
		.input('p3mc', sql.NVarChar, player3?.mainClass)
		.input('p3sc', sql.NVarChar, player3?.subClass)
		.input('p3link', sql.NVarChar, player3?.povVideoLink);

	request = request
		.input('p4pid', sql.Int, player4?.playerId)
		.input('p4rc', sql.NVarChar, player4?.inVideoName)
		.input('p4mc', sql.NVarChar, player4?.mainClass)
		.input('p4sc', sql.NVarChar, player4?.subClass)
		.input('p4link', sql.NVarChar, player4?.povVideoLink);

	const result = await request.query(
		`INSERT INTO 
     Submissions.Party (P1PlayerID,P2PlayerID,P3PlayerID,P4PlayerID,P1RunCharacter,P2RunCharacter,P3RunCharacter,P4RunCharacter,Patch,Region,Rank,Time,P1MainClass,P2MainClass,P3MainClass,P4MainClass,P1SubClass,P2SubClass,P3SubClass,P4SubClass,PartySize,P1Link,P2Link,P3Link,P4Link,Notes,SubmissionTime,SubmitterID,ServerID)
     VALUES (@p1pid,@p2pid,@p3pid,@p4pid,@p1rc,@p2rc,@p3rc,@p4rc,@patch,@region,@rank,@time,@p1mc,@p2mc,@p3mc,@p4mc,@p1sc,@p2sc,@p3sc,@p4sc,@partysize,@p1link,@p2link,@p3link,@p4link,@notes,@subtime,@subpid,@serverid);`
	);

	if (result.rowsAffected[0] == 0) {
		throw Error(`Purple Party Run insertion failed. Submission from ${run.username}`);
	}
};

const serializeTimeToSqlTime = (runTime: PurpleRunRequest['time']) =>
	`${runTime.minutes.toString().padStart(2)}:${runTime.seconds.toString().padStart(2)}:00`;
