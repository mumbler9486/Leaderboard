import type { UserRole } from '$lib/types/api/users/userRole';
import type { ClientPrincipal } from 'svelte-adapter-azure-swa';

export class ServerUser {
	public readonly userId: string;
	public readonly username: string;
	private roles: Record<string, boolean>;

	constructor(clientPrincipal: ClientPrincipal) {
		this.userId = clientPrincipal.userId;
		this.username = clientPrincipal.userDetails;
		this.roles =
			clientPrincipal.userRoles?.reduce(
				(prev, curr) => {
					prev[curr] = true;
					return prev;
				},
				{} as Record<string, boolean>
			) ?? {};
	}

	public hasRole(role: UserRole) {
		return this.roles[role] ?? false;
	}
}
