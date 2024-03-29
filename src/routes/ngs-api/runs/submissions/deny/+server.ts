import { jsonError } from '$lib/server/error.js';
import { denyRequestSchema, type DenyRequest } from '$lib/types/api/validation/submissions.js';
import { validateApiRequest } from '$lib/server/validation/requestValidation.js';
import { denyRunSubmission } from '$lib/server/logic/denyLogic.js';
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
	const { object: denyRequest, validationError } = await validateApiRequest<DenyRequest>(
		denyRequestSchema,
		body
	);
	if (!denyRequest) {
		return jsonError(400, validationError);
	}

	return denyRunSubmission(user, denyRequest);
}
