import type { IndomitableRun } from '$lib/types/api/duels/indomitable';
import { parseNgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { parseWeapon } from '$lib/types/api/weapon';
import { leaderboardDb } from '$lib/server/db/db';
import { error, json } from '@sveltejs/kit';
import { convertTimeToRunTime } from '$lib/server/db/util/datetime';

const indomitableTables: { [key: string]: string } = {
	nexaelio: 'IndomitableNexAelioRuns',
	renusretem: 'IndomitableRenusRetemRuns',
	amskvaris: 'IndomitableAmsKvarisRuns',
	nilsstia: 'IndomitableNilsStiaRuns'
};

export async function GET({ params, url }) {
	const quest = params.quest;
	const mainClass = url.searchParams.get('class');
	const region = url.searchParams.get('server');

	// Validate
	const table = indomitableTables[quest];
	if (table == undefined) {
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
