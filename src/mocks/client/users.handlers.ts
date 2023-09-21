import { rest } from 'msw';
import { mockModeratorUser } from './users.mock';

export const GET_USER_INFO = rest.get('/ngs-api/users/:userGuid', (req, res, ctx) => {
	return res(ctx.status(200), ctx.json(mockModeratorUser));
});

export const userHandlers = [GET_USER_INFO];
