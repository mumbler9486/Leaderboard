import { error, json } from '@sveltejs/kit';
import { leaderboardDb } from '$lib/server/db/db';
import { jsonError } from '$lib/server/error.js';
import {
	getDfaDuoRuns,
	getDfaPartyRuns,
	getDfaSoloRuns
} from '$lib/server/repositories/dfaRunsRepository.js';
import { PartySize, parsePartySize } from '$lib/types/api/partySizes.js';
import {
	dfaSoloSearchFilterSchema,
	type DfaSoloSearchFilter,
	type DfaPartySearchFilter
} from '$lib/types/api/validation/dfaRunFilter.js';
import { mapDfaPartyToRun, mapDfaSoloToRun } from '$lib/server/mappers/api/dfaRunMapper.js';
import { parseToRawSchema } from '$lib/utils/schemaValidation.js';

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
	const urlParams = parseToRawSchema(url, dfaSoloSearchFilterSchema);

	let filters: DfaSoloSearchFilter;
	try {
		filters = await dfaSoloSearchFilterSchema.validate(urlParams, {
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
		const data = await getDfaSoloRuns(request, filters);
		const runs = mapDfaSoloToRun(data);
		return json(runs);
	} catch (err) {
		console.error(err);
		throw err;
	}
};

const getPartyRuns = async (url: URL, partySize: PartySize) => {
	const urlParams = parseToRawSchema(url, dfaSoloSearchFilterSchema);

	let parsedRun: DfaPartySearchFilter;
	try {
		parsedRun = await dfaSoloSearchFilterSchema.validate(urlParams, {
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
				const data = await getDfaDuoRuns(request, parsedRun);
				const runs = mapDfaPartyToRun(data);
				return json(runs);
			} catch (err) {
				console.error(err);
				throw err;
			}
		case PartySize.Party:
			try {
				const poolConnection = await leaderboardDb.connect();
				const request = poolConnection.request();
				const data = await getDfaPartyRuns(request, parsedRun);
				const runs = mapDfaPartyToRun(data);
				return json(runs);
			} catch (err) {
				console.error(err);
				throw err;
			}
		default:
			throw error(404, 'not_found');
	}
};
