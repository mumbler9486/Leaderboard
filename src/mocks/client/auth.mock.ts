import type { ClientPrincipal } from 'svelte-adapter-azure-swa';

// When accessing the x-ms-client-principal header, the API function does not
// contain the claims array

export const mockModeratorUser = {
	clientPrincipal: {
		identityProvider: 'aadb2c',
		userId: '15ea8a0f-86b8-4f0b-bcd8-1582ecda036a',
		userDetails: 'mock_moderator',
		userRoles: ['anonymous', 'authenticated', 'user', 'moderator']
	} satisfies ClientPrincipal
};

export const mockNormalUser = {
	clientPrincipal: {
		identityProvider: 'aadb2c',
		userId: 'd78f01d3-f5a9-4106-a199-0d43ac79ace1',
		userDetails: 'mock_normal_user',
		userRoles: ['anonymous', 'authenticated', 'user']
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
	clientPrincipal: undefined
};
