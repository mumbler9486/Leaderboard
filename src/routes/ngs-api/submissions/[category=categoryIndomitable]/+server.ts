import { json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import { getIndomitableSubmissions } from '$lib/server/repositories/indomitableSubmissionsRepository.js';
import { mapIndomitableDuel } from '$lib/server/mappers/api/indomitableSubmitMapper.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const category = params.category?.toLowerCase() ?? '';

	const poolConnection = await leaderboardDb.connect();

	try {
		const request = poolConnection.request();
		const data = await getIndomitableSubmissions(request, category);
		const submissions = mapIndomitableDuel(data, category);
		return json(submissions);
	} catch (err) {
		console.error(err);
		throw err;
	}
}
