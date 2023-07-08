export const mockModeratorUser = {
	clientPrincipal: {
		identityProvider: 'aadb2c',
		userId: 'c2c8a1d1-3470-40e2-b0e1-7ff21b7f4c50',
		userDetails: 'mockModeratorUser',
		userRoles: ['anonymous', 'authenticated', 'user', 'moderator'],
		claims: [
			{
				typ: 'ver',
				val: '1.0'
			}
		]
	}
};

export const mockNormalUser = {
	clientPrincipal: {
		identityProvider: 'aadb2c',
		userId: 'c2c8a1d1-3470-40e2-b0e1-7ff21b7f4c50',
		userDetails: 'mockUser',
		userRoles: ['anonymous', 'authenticated', 'user'],
		claims: [
			{
				typ: 'ver',
				val: '1.0'
			}
		]
	}
};

export const mockNewlyCreatedUser = {
	clientPrincipal: {
		identityProvider: 'aadb2c',
		userId: 'c2c8a1d1-3470-40e2-b0e1-7ff21b5f4c50',
		userDetails: 'mockUser',
		userRoles: ['anonymous', 'authenticated'],
		claims: [
			{
				typ: 'ver',
				val: '1.0'
			}
		]
	}
};

export const mockLoggedOutUser = {
	clientPrincipal: null
};
