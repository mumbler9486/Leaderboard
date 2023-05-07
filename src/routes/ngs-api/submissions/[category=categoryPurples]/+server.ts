import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import {
	getPurpleDuoSubmissions,
	getPurplePartySubmissions,
	getPurpleSoloSubmissions
} from '$lib/server/repositories/purpleSubmissionsRepository.js';
import {
	mapPurpleDuoToSubmission,
	mapPurplePartyToSubmission,
	mapPurpleSoloToSubmission
} from '$lib/server/mappers/api/purpleSubmitMapper.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const category = params.category?.toLowerCase() ?? '';

	const poolConnection = await leaderboardDb.connect();

	switch (category) {
		case 'purpleparty':
			try {
				const request = poolConnection.request();
				const data = await getPurplePartySubmissions(request);
				const submissions = mapPurplePartyToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				throw err;
			}
		case 'purpleduo':
			try {
				const request = poolConnection.request();
				const data = await getPurpleDuoSubmissions(request);
				const submissions = mapPurpleDuoToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				throw err;
			}
		case 'purplesolo':
			try {
				const request = poolConnection.request();
				const data = await getPurpleSoloSubmissions(request);
				const submissions = mapPurpleSoloToSubmission(data);
				return json(submissions);
			} catch (err) {
				console.error(err);
				throw err;
			}
		default:
			throw error(404, 'not_found');
	}
}
