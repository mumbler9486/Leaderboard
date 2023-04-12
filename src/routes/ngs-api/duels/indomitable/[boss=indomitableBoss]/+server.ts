import type { IndomitableRun } from '$lib/types/api/duels/indomitable';
import { parseNgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { parseWeapon } from '$lib/types/api/weapon';
import { leaderboardDb } from '$lib/server/db/db';
import { error, json } from '@sveltejs/kit';
import { convertTimeToRunTime } from '$lib/server/db/util/datetime';
import { type InferType, string, number, object, array } from 'yup';
import { normalizeYoutubeLink, youtubeUrlRegex } from '$lib/utils/youtube.js';
import { jsonError } from '$lib/server/error.js';
import { weaponsToDbValMap } from '$lib/server/db/util/weaponType.js';
import { notifyDiscordNewRunSubmitted } from '$lib/server/discordNotify.js';

const indomitableTables: { [key: string]: string } = {
	nexaelio: 'IndomitableNexAelioRuns',
	renusretem: 'IndomitableRenusRetemRuns',
	amskvaris: 'IndomitableAmsKvarisRuns',
	nilsstia: 'IndomitableNilsStiaRuns'
};

export async function GET({ params, url }) {
	const quest = params.boss ?? '';
	const mainClass = url.searchParams.get('class');
	const region = url.searchParams.get('server');

	// Validate
	const table = indomitableTables[quest.toLowerCase()];
	if (!table) {
		throw error(404);
	}

	// Get data
	console.log(params, url.searchParams);

	try {
		const pool = await leaderboardDb.connect();
		let request = await pool.request();
		let query = `
			SELECT TOP (1000) * FROM ${table}
			WHERE 1=1
		`;

		if (region && region != 'No Filter') {
			query += ' AND Region = @region';
			request = request.input('region', region);
		}

		if (mainClass && mainClass != 'No Filter') {
			query += ' AND MainClass = @mainClass';
			request = request.input('mainClass', mainClass);
		}

		query += ' ORDER BY RunTime';

		const results = await request.query(query);
		const mapped = mapData(results.recordset);

		return json(mapped);
	} catch (err) {
		console.error(err);
		throw error(500);
	}
}

const mapData = (queryData: any[]): IndomitableRun[] => {
	return queryData.map((run, i) => {
		const weapons = [
			run.WeaponInfo1,
			run.WeaponInfo2,
			run.WeaponInfo3,
			run.WeaponInfo4,
			run.WeaponInfo5,
			run.WeaponInfo6
		];
		return {
			rank: i + 1,
			playerName: run.RunCharacterName,
			mainClass: parseNgsPlayerClass(run.MainClass),
			subClass: parseNgsPlayerClass(run.SubClass),
			notes: run.Notes,
			server: run.Region,
			time: convertTimeToRunTime(run.RunTime),
			videoUrl: run.Link,
			weapons: weapons.filter((w) => !!w).map((w) => parseWeapon(w))
		} as IndomitableRun;
	});
};

const indomitableRequestSchema = object({
	userId: string().required(),
	username: string().required(),
	boss: string().required(),
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
		.max(1)
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

type IndomitableRunRequest = InferType<typeof indomitableRequestSchema>;

const indomitableBosses: { [key: string]: string } = {
	nexaelio: 'Nex Aelio',
	renusretem: 'Renus Retem',
	amskvaris: 'Ams Kvaris',
	nilsstia: 'Nils Stia'
};

export async function POST({ params, request }) {
	const boss = params.boss ?? '';

	// Validate request
	const body = await request.json();
	let parsedRun: IndomitableRunRequest;
	try {
		parsedRun = await indomitableRequestSchema.validate(body);
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
	parsedRun.boss = boss.toLowerCase();
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
		await insertSoloRun(parsedRun);

		const player1Name = parsedRun.username;
		const bossName = indomitableBosses[parsedRun.boss];
		notifyDiscordNewRunSubmitted(player1Name, `Indomitable ${bossName} Duel`);
		return json({ data: 'success' });
	} catch (err) {
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
}

const checkRunData = async (run: IndomitableRunRequest) => {
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
			FROM Submissions.IndomitableNexAelioRuns 
			WHERE Link IN (${paramList.join(',')})
		UNION
		SELECT P1Link
			FROM Submissions.IndomitableRenusRetemRuns
			WHERE Link IN (${paramList.join(',')})
		UNION
		SELECT P2Link
			FROM Submissions.IndomitableAmsKvarisRuns
			WHERE Link IN (${paramList.join(',')})
		UNION
		SELECT P3Link
			FROM Submissions.IndomitableNilsStiaRuns
			WHERE Link IN (${paramList.join(',')});`);

	if (videoLinksResults.recordset.length > 0) {
		const videosInUse = videoLinksResults.recordset.map((r) => r.Link as string);
		videosInUse.forEach((l) => {
			errorList.push(`Video already used in another run. VideoUrl=${l}`);
		});
	}

	return errorList;
};

const insertSoloRun = (run: IndomitableRunRequest) => {
	console.log('Pretend run was submitted');
};
