import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import {
	getDfaDuoSubmissions,
	getDfaPartySubmissions,
	getDfaSoloSubmissions
} from '$lib/server/repositories/dfaSubmissionsRepository.js';
import {
	mapDfaDuoToSubmission,
	mapDfaPartyToSubmission,
	mapDfaSoloToSubmission
} from '$lib/server/mappers/api/dfaSubmitMapper.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
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
				throw err;
			}
		case 'dfaduo':
			try {
				const request = poolConnection.request();
				const data = await getDfaDuoSubmissions(request);
				const submissions = mapDfaDuoToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				throw err;
			}
		case 'dfasolo':
			try {
				const request = poolConnection.request();
				const data = await getDfaSoloSubmissions(request);
				const submissions = mapDfaSoloToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				throw err;
			}
		default:
			throw error(404, 'not_found');
	}
}
