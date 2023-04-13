import sql from 'mssql';
import { Weapon, parseWeapon } from '$lib/types/api/weapon';
import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { type InferType, string, number, object, array } from 'yup';
import { notifyDiscordNewRunSubmitted } from '$lib/server/discordNotify';
import { normalizeYoutubeLink, youtubeUrlRegex } from '$lib/utils/youtube';
import { jsonError } from '$lib/server/error.js';
import { weaponsToDbValMap } from '$lib/server/db/util/weaponType.js';

const dfaRequestSchema = object({
	userId: string().required(),
	username: string().required(),
	type: string()
		.test((t) => !!questTypeMap[t ?? ''])
		.required(),
	serverRegion: string().required(),
	support: string().required(),
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
					.test((w) => !!parseWeapon(w.toLowerCase()))
			)
				.max(6)
				.required()
		})
	)
		.min(1)
		.max(8)
		.test('has_video', 'At least one player must have a video', (players) =>
			players?.some((p) => p.inVideoName !== undefined)
		)
		.test(
			'player1_has_id',
			'Player 1 must be an existing user',
			(players) => players?.at(0)?.playerId !== undefined
		)
		.test('solo_requires_weapon', 'Solo requires weapon definition', (players) =>
			players?.length == 1 ? players?.at(0)?.weapons[0] !== undefined : true
		)
		.required()
});

type DfaRunRequest = InferType<typeof dfaRequestSchema>;

const triggerDbMap: { [key: string]: number } = {
	trigger: 1,
	urgent: 0
};

// For webhook notify
const partyTypeMap: { [key: number]: string } = {
	1: 'Solo',
	2: 'Duo',
	8: 'Full MPA'
};

const questTypeMap: { [key: string]: string } = {
	trigger: 'Trigger',
	urgent: 'Urgent Quest'
};

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	// Validate request
	const body = await request.json();
	let parsedRun: DfaRunRequest;
	try {
		parsedRun = await dfaRequestSchema.validate(body);
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
		const dfaType = questTypeMap[parsedRun.type];
		const partyType = partyTypeMap[parsedRun.players.length] ?? '';
		notifyDiscordNewRunSubmitted(player1Name, `Dark Falz Aegis [${dfaType}] (${partyType})`);
		return json({ data: 'success' });
	} catch (err) {
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
}

const checkRunData = async (run: DfaRunRequest) => {
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
			FROM Submissions.DFAegisSolo 
			WHERE Link IN (${paramList.join(',')})
		UNION
		SELECT P1Link
			FROM Submissions.DFAegisParty
			WHERE P1Link IN (${paramList.join(',')})
		UNION
		SELECT P2Link
			FROM Submissions.DFAegisParty
			WHERE P2Link IN (${paramList.join(',')})
		UNION
		SELECT P3Link
			FROM Submissions.DFAegisParty
			WHERE P3Link IN (${paramList.join(',')})
		UNION
		SELECT P4Link
			FROM Submissions.DFAegisParty
			WHERE P4Link IN (${paramList.join(',')})
    UNION
    SELECT P5Link
			FROM Submissions.DFAegisParty
			WHERE P5Link IN (${paramList.join(',')})
		UNION
		SELECT P6Link
			FROM Submissions.DFAegisParty
			WHERE P6Link IN (${paramList.join(',')})
		UNION
		SELECT P7Link
			FROM Submissions.DFAegisParty
			WHERE P7Link IN (${paramList.join(',')})
		UNION
		SELECT P8Link
			FROM Submissions.DFAegisParty
			WHERE P8Link IN (${paramList.join(',')});`);

	if (videoLinksResults.recordset.length > 0) {
		const videosInUse = videoLinksResults.recordset.map((r) => r.Link as string);
		videosInUse.forEach((l) => {
			errorList.push(`Video already used in another run. VideoUrl=${l}`);
		});
	}

	return errorList;
};

const insertSoloRun = async (run: DfaRunRequest) => {
	const pool = await leaderboardDb.connect();

	// Get player info
	const player1 = run.players[0];

	const runTime = serializeTimeToSqlTime(run.time);

	const submissionTime = new Date();

	let request = pool
		.request()
		.input('playerId', sql.Int, player1.playerId)
		.input('runCharacter', sql.NVarChar, player1.inVideoName)
		.input('patch', sql.NVarChar, '60R')
		.input('drill', sql.Int, triggerDbMap[run.type])
		.input('support', sql.NVarChar, run.support)
		.input('time', sql.NVarChar, runTime)
		.input('mainClass', sql.NVarChar, player1.mainClass)
		.input('subClass', sql.NVarChar, player1.subClass)
		.input('w1', sql.NVarChar, player1.weapons[0])
		.input('w2', sql.NVarChar, player1.weapons[1])
		.input('w3', sql.NVarChar, player1.weapons[2])
		.input('w4', sql.NVarChar, player1.weapons[3])
		.input('w5', sql.NVarChar, player1.weapons[4])
		.input('w6', sql.NVarChar, player1.weapons[5])
		.input('link', sql.NVarChar, player1.povVideoLink)
		.input('notes', sql.NVarChar, run.notes)
		.input('submissionTime', sql.DateTime, submissionTime)
		.input('submitterId', sql.Int, player1.playerId);

	const result = await request.query(
		`INSERT INTO 
     Submissions.DFAegisSolo (PlayerID,RunCharacter,Patch,Drill,Support,Time,MainClass,SubClass,W1,W2,W3,W4,W5,W6,Link,Notes,SubmissionTime,SubmitterID)
     VALUES (@playerId,@runCharacter,@patch,@drill,@support,@time,@mainClass,@subClass,@w1,@w2,@w3,@w4,@w5,@w6,@link,@notes,@submissionTime,@submitterId);
		`
	);

	if (result.rowsAffected[0] == 0) {
		throw Error(`DFA Solo Run insertion failed. Submission from: ${run.username}`);
	}
};

const insertPartyRun = async (run: DfaRunRequest) => {
	const pool = await leaderboardDb.connect();

	// Get player info
	const player1 = run.players[0];
	const player2 = run.players[1];
	const player3 = run.players[2];
	const player4 = run.players[3];
	const player5 = run.players[4];
	const player6 = run.players[5];
	const player7 = run.players[6];
	const player8 = run.players[7];

	const runTime = serializeTimeToSqlTime(run.time);

	const submissionTime = new Date();

	let request = pool
		.request()
		.input('partysize', sql.Int, run.players.length)
		.input('subtime', sql.DateTime, submissionTime)
		.input('subpid', sql.Int, player1.playerId)
		.input('serverid', sql.NVarChar, run.serverRegion)
		.input('questrank', sql.Int, 1)
		.input('patch', sql.NVarChar, '60R')
		.input('region', sql.NVarChar, run.support)
		.input('rank', sql.Int, triggerDbMap[run.type])
		.input('time', sql.NVarChar, runTime)
		.input('notes', sql.NVarChar, run.notes);

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

	request = request
		.input('p5pid', sql.Int, player5?.playerId)
		.input('p5rc', sql.NVarChar, player5?.inVideoName)
		.input('p5mc', sql.NVarChar, player5?.mainClass)
		.input('p5sc', sql.NVarChar, player5?.subClass)
		.input('p5link', sql.NVarChar, player5?.povVideoLink);

	request = request
		.input('p6pid', sql.Int, player6?.playerId)
		.input('p6rc', sql.NVarChar, player6?.inVideoName)
		.input('p6mc', sql.NVarChar, player6?.mainClass)
		.input('p6sc', sql.NVarChar, player6?.subClass)
		.input('p6link', sql.NVarChar, player6?.povVideoLink);

	request = request
		.input('p7pid', sql.Int, player7?.playerId)
		.input('p7rc', sql.NVarChar, player7?.inVideoName)
		.input('p7mc', sql.NVarChar, player7?.mainClass)
		.input('p7sc', sql.NVarChar, player7?.subClass)
		.input('p7link', sql.NVarChar, player7?.povVideoLink);

	request = request
		.input('p8pid', sql.Int, player8?.playerId)
		.input('p8rc', sql.NVarChar, player8?.inVideoName)
		.input('p8mc', sql.NVarChar, player8?.mainClass)
		.input('p8sc', sql.NVarChar, player8?.subClass)
		.input('p8link', sql.NVarChar, player8?.povVideoLink);

	const result = await request.query(
		`INSERT INTO 
     Submissions.DFAegisParty (P1PlayerID,P2PlayerID,P3PlayerID,P4PlayerID,P5PlayerID,P6PlayerID,P7PlayerID,P8PlayerID,P1RunCharacter,P2RunCharacter,P3RunCharacter,P4RunCharacter,P5RunCharacter,P6RunCharacter,P7RunCharacter,P8RunCharacter,Patch,Buff,Drill,Time,P1MainClass,P2MainClass,P3MainClass,P4MainClass,P5MainClass,P6MainClass,P7MainClass,P8MainClass,P1SubClass,P2SubClass,P3SubClass,P4SubClass,P5SubClass,P6SubClass,P7SubClass,P8SubClass,PartySize,P1Link,P2Link,P3Link,P4Link,P5Link,P6Link,P7Link,P8Link,Notes,SubmissionTime,SubmitterID,ServerID,Rank)
     VALUES (@p1pid,@p2pid,@p3pid,@p4pid,@p5pid,@p6pid,@p7pid,@p8pid,@p1rc,@p2rc,@p3rc,@p4rc,@p5rc,@p6rc,@p7rc,@p8rc,@patch,@region,@rank,@time,@p1mc,@p2mc,@p3mc,@p4mc,@p5mc,@p6mc,@p7mc,@p8mc,@p1sc,@p2sc,@p3sc,@p4sc,@p5sc,@p6sc,@p7sc,@p8sc,@partysize,@p1link,@p2link,@p3link,@p4link,@p5link,@p6link,@p7link,@p8link,@notes,@subtime,@subpid,@serverid,@questrank);
     `
	);

	if (result.rowsAffected[0] == 0) {
		throw Error(`DFA Party Run insertion failed. Submission from: ${run.username}`);
	}
};

const serializeTimeToSqlTime = (runTime: DfaRunRequest['time']) =>
	`${runTime.hours.toString().padStart(2)}:${runTime.minutes
		.toString()
		.padStart(2)}:${runTime.seconds.toString().padStart(2)}`;
