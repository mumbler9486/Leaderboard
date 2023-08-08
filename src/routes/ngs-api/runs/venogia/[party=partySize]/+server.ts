import { leaderboardDb } from '$lib/server/db/db';
import { jsonError } from '$lib/server/error.js';
import { mapRuns } from '$lib/server/mappers/api/runMapper.js';
import { getRuns } from '$lib/server/repositories/runsRepository.js';
import { PartySize, parsePartySize } from '$lib/types/api/partySizes.js';
import { json } from '@sveltejs/kit';

const partySizeMap: Record<PartySize, number> = {
	[PartySize.Solo]: 1,
	[PartySize.Duo]: 2,
	[PartySize.Party]: 8
};

/** @type {import('./$types').RequestHandler} */
export async function GET({ params }) {
	const partySize = parsePartySize(params.party);
	if (!partySize) {
		return jsonError(400, 'invalid party size');
	}

	const pool = await leaderboardDb.connect();
	const request = await pool.request();

	try {
		const runs = await getRuns(request, { approved: true, partySize: partySizeMap[partySize] });
		const mappedRuns = mapRuns(runs);
		return json(mappedRuns);
	} catch (err) {
		console.error(err);
	}
}
