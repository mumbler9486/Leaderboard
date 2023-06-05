import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';
import { jsonError } from '$lib/server/error.js';
import { denyRequestSchema, type DenyRequest } from '$lib/types/api/validation/submissions.js';
import { parseRunCategory, RunCategories } from '$lib/types/api/categories.js';
import {
	denyDfaDuo,
	denyDfaParty,
	denyDfaSolo,
	getDfaDuoExists,
	getDfaPartyExists,
	getDfaSoloExists
} from '$lib/server/repositories/dfaSubmissionsRepository.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, params }) {
	const category = parseRunCategory(params.category);
	if (!category) {
		return jsonError(404, 'Unknown category');
	}

	// Validate request
	const body = await request.json();
	let denyRequest: DenyRequest;
	try {
		denyRequest = await denyRequestSchema.validate(body);
	} catch (err: any) {
		return jsonError(400, {
			error: 'bad_request',
			details: err.errors
		});
	}
	if (!denyRequest) {
		return jsonError(400, { error: 'json_parse_error' });
	}

	// Check data in db
	const { errorList: validationErrors, extra: data } = await checkData(denyRequest, category);
	if (validationErrors.length > 0 || !data) {
		return jsonError(400, { error: 'bad_request', details: validationErrors });
	}

	try {
		const pool = await leaderboardDb.connect();
		const request = pool.request();
		if (category == RunCategories.DfaSolo) {
			await denyDfaSolo(request, denyRequest);
		} else if (category == RunCategories.DfaDuo) {
			await denyDfaDuo(request, denyRequest);
		} else if (category == RunCategories.DfaParty) {
			await denyDfaParty(request, denyRequest);
		}
		return json({ data: 'success' });
	} catch (err) {
		console.error(err);
		throw jsonError(500, { error: 'internal_server_error' });
	}
}

const checkData = async (run: DenyRequest, category: RunCategories) => {
	const pool = await leaderboardDb.connect();
	const errorList: string[] = [];

	// Run exists
	const submissionRequest = pool.request();
	let submissionResult:
		| {
				SubmissionId: string;
				SubmissionStatus: string;
				PlayerId: string;
		  }
		| undefined;
	if (category == RunCategories.DfaSolo) {
		submissionResult = await getDfaSoloExists(submissionRequest, run.runId);
	} else if (category == RunCategories.DfaDuo) {
		submissionResult = await getDfaDuoExists(submissionRequest, run.runId);
	} else if (category == RunCategories.DfaParty) {
		submissionResult = await getDfaPartyExists(submissionRequest, run.runId);
	}

	if (!submissionResult) {
		errorList.push(`Unknown submissionId`);
		return {
			errorList
		};
	}
	if (submissionResult && submissionResult.SubmissionStatus != '0') {
		errorList.push(`Submission already denied/approved`);
	}

	return {
		errorList,
		extra: {
			playerId: parseInt(submissionResult.PlayerId)
		}
	};
};
