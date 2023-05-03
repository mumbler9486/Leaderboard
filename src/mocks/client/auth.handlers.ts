import { rest } from 'msw';
import { mockModeratorUser, mockNormalUser } from './auth.mock';

export const B2C_LOGGED_IN_MODERATOR = rest.get('/.auth/me', (req, res, ctx) => {
	return res(ctx.status(200), ctx.json(mockModeratorUser));
});

export const B2C_LOGGED_IN_USER = rest.get('/.auth/me', (req, res, ctx) => {
	return res(ctx.status(200), ctx.json(mockNormalUser));
});

export const authHandlers = [B2C_LOGGED_IN_USER];
