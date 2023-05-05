import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import { getIndomitableSubmissions } from '$lib/server/repositories/indomitableSubmissionsRepository.js';
import {
	getPurpleDuoSubmissions,
	getPurplePartySubmissions,
	getPurpleSoloSubmissions
} from '$lib/server/repositories/purpleSubmissionsRepository.js';
import {
	getDfaDuoSubmissions,
	getDfaPartySubmissions,
	getDfaSoloSubmissions
} from '$lib/server/repositories/dfaSubmissionsRepository.js';
import { mapIndomitableDuel } from '$lib/server/mappers/api/indomitableSubmitMapper.js';
import {
	mapDfaDuoToSubmission,
	mapDfaPartyToSubmission,
	mapDfaSoloToSubmission
} from '$lib/server/mappers/api/dfaSubmitMapper.js';
import {
	mapPurpleDuoToSubmission,
	mapPurplePartyToSubmission,
	mapPurpleSoloToSubmission
} from '$lib/server/mappers/api/purpleSubmitMapper.js';

const validDuelBosses: { [key: string]: boolean } = {
	nexaelio: true,
	renusretem: true,
	amskvaris: true,
	nilsstia: true
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
	const category = params.category?.toLowerCase() ?? '';

	const poolConnection = await leaderboardDb.connect();

	switch (category) {
		case 'dfaparty':
			try {
				const request = poolConnection.request();
				const data = await getDfaPartySubmissions(request);
				const submissions = mapDfaPartyToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				break;
			}
		case 'dfaduo':
			try {
				const request = poolConnection.request();
				const data = await getDfaDuoSubmissions(request);
				const submissions = mapDfaDuoToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				break;
			}
		case 'dfasolo':
			try {
				const request = poolConnection.request();
				const data = await getDfaSoloSubmissions(request);
				const submissions = mapDfaSoloToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				break;
			}
		case 'purpleparty':
			try {
				const request = poolConnection.request();
				const data = await getPurplePartySubmissions(request);
				const submissions = mapPurplePartyToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				break;
			}
		case 'purpleduo':
			try {
				const request = poolConnection.request();
				const data = await getPurpleDuoSubmissions(request);
				const submissions = mapPurpleDuoToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				break;
			}
		case 'purplesolo':
			try {
				const request = poolConnection.request();
				const data = await getPurpleSoloSubmissions(request);
				const submissions = mapPurpleSoloToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				break;
			}
		case 'duelindomitable':
			try {
				const boss = url.searchParams.get('boss') ?? '';
				const duelTable = validDuelBosses[boss];
				if (!duelTable) {
					throw error(400, 'bad_request');
				}

				const request = poolConnection.request();
				const data = await getIndomitableSubmissions(request, boss);
				const submissions = mapIndomitableDuel(data, boss);
				return json(submissions);
			} catch (err) {
				console.error(err);
				break;
			}
		default:
			throw error(404, 'not_found');
	}
}
