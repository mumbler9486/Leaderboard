import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import { jsonError } from '$lib/server/error.js';
import { PartySize, parsePartySize } from '$lib/types/api/partySizes.js';
import {
	purplePartySearchFilterSchema,
	type PurplePartySearchFilter,
	type PurpleSoloSearchFilter,
	purpleSoloSearchFilterSchema
} from '$lib/server/types/validation/purpleRunFilter.js';
import {
	mapPurplePartyToRun,
	mapPurpleSoloToRun
} from '$lib/server/mappers/api/purpleRunMapper.js';
import {
	getPurpleDuoRuns,
	getPurplePartyRuns,
	getPurpleSoloRuns
} from '$lib/server/repositories/purpleRunsRepository.js';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url }) {
	const partySize = parsePartySize(params.party);

	switch (partySize) {
		case PartySize.Solo:
			return getSoloRuns(url);
		case PartySize.Duo:
		case PartySize.Party:
			return getPartyRuns(url, partySize);
		default:
			return jsonError(404, 'not_found');
	}
}
const getSoloRuns = async (url: URL) => {
	const urlParams = {
		server: url.searchParams.get('server'),
		class: url.searchParams.get('class'),
		region: url.searchParams.get('region'),
		rank: url.searchParams.get('rank')
	};

	let filters: PurpleSoloSearchFilter;
	try {
		filters = await purpleSoloSearchFilterSchema.validate(urlParams, {
			stripUnknown: true
		});
	} catch (err: any) {
		return jsonError(400, {
			error: 'bad_request',
			details: err.errors
		});
	}

	try {
		const poolConnection = await leaderboardDb.connect();
		const request = poolConnection.request();
		const data = await getPurpleSoloRuns(request, filters);
		const runs = mapPurpleSoloToRun(data);
		return json(runs);
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const getPartyRuns = async (url: URL, partySize: PartySize) => {
	const urlParams = {
		server: url.searchParams.get('server'),
		region: url.searchParams.get('region'),
		rank: url.searchParams.get('rank')
	};

	let parsedRun: PurplePartySearchFilter;
	try {
		parsedRun = await purplePartySearchFilterSchema.validate(urlParams, {
			stripUnknown: true
		});
	} catch (err: any) {
		return jsonError(400, {
			error: 'bad_request',
			details: err.errors
		});
	}
	switch (partySize) {
		case PartySize.Duo:
			try {
				const poolConnection = await leaderboardDb.connect();
				const request = poolConnection.request();
				const data = await getPurpleDuoRuns(request, parsedRun);
				const runs = mapPurplePartyToRun(data);
				return json(runs);
			} catch (err) {
				console.error(err);
				throw err;
			}
		case PartySize.Party:
			try {
				const poolConnection = await leaderboardDb.connect();
				const request = poolConnection.request();
				const data = await getPurplePartyRuns(request, parsedRun);
				const runs = mapPurplePartyToRun(data);
				return json(runs);
			} catch (err) {
				console.error(err);
				throw err;
			}
		default:
			throw error(404, 'not_found');
	}
};
