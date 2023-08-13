import { jsonError } from '$lib/server/error.js';
import {
	approveRequestSchema,
	type ApproveRequest
} from '$lib/types/api/validation/submissions.js';
import { approveRunSubmission } from '$lib/server/logic/approveLogic.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
	// Validate request
	const body = await request.json();
	const { object: approveRequest, validationError } = await validateApiRequest<ApproveRequest>(
		approveRequestSchema,
		body
	);
	if (!approveRequest) {
		return jsonError(400, validationError);
	}

	return approveRunSubmission(approveRequest);
}
