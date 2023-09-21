import { ErrorCodes } from '$lib/types/api/error';
import type { UserRole } from '$lib/types/api/users/userRole';
import { jsonError } from '../error';
import { ServerUser } from '../types/auth/user';

export const getUserValidated = (requestLocals: App.Locals, atLeastRoles?: UserRole[]) => {
	const clientPrincipal = requestLocals.clientPrincipal;
	if (!clientPrincipal) {
		return {
			user: undefined,
			error: jsonError(401, ErrorCodes.Unauthorized)
		};
	}

	const user = new ServerUser(clientPrincipal);

	if (!!atLeastRoles && atLeastRoles.length > 0) {
		const hasRole = atLeastRoles.some((s) => user.hasRole(s));
		if (!hasRole) {
			return {
				user: undefined,
				error: jsonError(403, ErrorCodes.Forbidden)
			};
		}
	}

	return { user: user, error: undefined };
};
