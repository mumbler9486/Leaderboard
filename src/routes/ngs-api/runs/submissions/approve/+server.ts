import { jsonError } from '$lib/server/error.js';
import {
	approveRequestSchema,
	type ApproveRequest,
} from '$lib/types/api/validation/submissions.js';
import { approveRunSubmission } from '$lib/server/logic/approveLogic.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';
import { UserRole } from '$lib/types/api/users/userRole.js';
import { getUserValidated } from '$lib/server/validation/authorization.js';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request, locals }) {
	const { user, error } = getUserValidated(locals, [UserRole.Moderator]);
	if (!!error) {
		return error;
	}

	// Validate request
	const body = await request.json();
	const { object: approveRequest, validationError } = await validateApiRequest<ApproveRequest>(
		approveRequestSchema,
		body
	);
	if (!approveRequest) {
		return jsonError(400, validationError);
	}

	return approveRunSubmission(user, approveRequest);
}
