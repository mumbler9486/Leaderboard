import type { ClientPrincipal } from 'svelte-adapter-azure-swa';

// When accessing the x-ms-client-principal header, the API function does not
// contain the claims array

export const mockModeratorUser = {
	clientPrincipal: {
		identityProvider: 'aadb2c',
		userId: 'c2c8a1d1-3470-40e2-b0e1-7ff21b7f4c50',
		userDetails: 'mockModeratorUser',
		userRoles: ['anonymous', 'authenticated', 'user', 'moderator']
	} satisfies ClientPrincipal
};

export const mockNormalUser = {
	clientPrincipal: {
		identityProvider: 'aadb2c',
		userId: 'c2c8a1d1-3470-40e2-b0e1-7ff21b7f4c50',
		userDetails: '詩織',
		userRoles: ['anonymous', 'user', 'moderator']
	} satisfies ClientPrincipal
};

export const mockNewlyCreatedUser = {
	clientPrincipal: {
		identityProvider: 'aadb2c',
		userId: 'c2c8a1d1-3470-40e2-b0e1-7ff21b5f4c50',
		userDetails: 'mockUser',
		userRoles: ['anonymous', 'authenticated']
	} satisfies ClientPrincipal
};

export const mockLoggedOutUser = {
	clientPrincipal: null
};
