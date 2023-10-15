import { leaderboardDb } from '$lib/server/db/db.js';
import { jsonError } from '$lib/server/error.js';
import { mapRuns } from '$lib/server/mappers/api/runMapper.js';
import { getRuns } from '$lib/server/repositories/runsRepository.js';
import { getUser } from '$lib/server/repositories/userRepository.js';
import type { ServerSearchFilter } from '$lib/server/types/api/runsSearch.js';
import { getUserValidated } from '$lib/server/validation/authorization.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';
import { ErrorCodes } from '$lib/types/api/error.js';
import { UserRole } from '$lib/types/api/users/userRole.js';
import type { RunsSearchFilter } from '$lib/types/api/validation/runsSearchFilter.js';
import {
	submissionSearchFilterSchema,
	type SubmissionSearchFilter,
} from '$lib/types/api/validation/submissionSearchFilter.js';
import { parseToRawSchema } from '$lib/utils/schemaValidation.js';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url, locals }) {
	const { user, error } = getUserValidated(locals, [
		UserRole.Administrator,
		UserRole.Moderator,
		UserRole.User,
	]);
	if (!!error) {
		return error;
	}

	const urlParams = parseToRawSchema(url, submissionSearchFilterSchema);

	const { object: parsedFilter, validationError } =
		await validateApiRequest<SubmissionSearchFilter>(submissionSearchFilterSchema, urlParams);
	if (!parsedFilter) {
		return jsonError(400, validationError);
	}

	if (!user.hasRole(UserRole.Moderator) && !parsedFilter.submitterId) {
		return jsonError(403, ErrorCodes.Forbidden);
	}

	const filter = {
		page: parsedFilter.page,
		take: parsedFilter.take,
		sort: parsedFilter.sort,
	} as RunsSearchFilter;

	const serverFilters: ServerSearchFilter = {
		submissionStatus: parsedFilter.status ?? undefined,
	};

	// Submitter id specified, can only check one's self unless moderator
	if (parsedFilter.submitterId) {
		const pool = await leaderboardDb.connect();
		const request = await pool.request();
		const player = await getUser(request, user.userId);

		const submitterId = !player?.Id ? undefined : parseInt(player.Id);
		if (!user.hasRole(UserRole.Moderator) && submitterId !== parsedFilter.submitterId) {
			return jsonError(403, ErrorCodes.Forbidden);
		}

		serverFilters.submitterId = submitterId;
	}

	try {
		const pool = await leaderboardDb.connect();
		const request = await pool.request();

		const runs = await getRuns(request, filter, serverFilters);
		const mappedRuns = mapRuns(runs);
		return json(mappedRuns);
	} catch (err) {
		console.error(err);
	}
}
