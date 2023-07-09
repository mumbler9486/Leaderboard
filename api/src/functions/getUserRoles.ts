import * as sql from 'mssql';
import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { readJsonRequest } from '../../util/json';
import { sqlDb } from '../../db/db';

interface GetUserRoleRequest {
	userId: string;
}

export async function httpTrigger(
	request: HttpRequest,
	context: InvocationContext
): Promise<HttpResponseInit> {
	const requestBody = await readJsonRequest<GetUserRoleRequest>(request);
	if (!requestBody) {
		return { status: 400, body: 'Invalid JSON' };
	}

	const userGuid = requestBody.userId;

	try {
		const pool = await sqlDb.connect();
		const queryRequest = await pool.request();

		const userRoles = await getUserRole(queryRequest, userGuid);
		const response = {
			roles: userRoles
		};
		return { jsonBody: response };
	} catch (err) {
		context.error(err);
		throw err;
	}
}

async function getUserRole(request: sql.Request, userGuid: string) {
	const results = await request.input('userGuid', sql.NVarChar, userGuid).query(`
    SELECT
      ui.Role,
      ui.ExtraRole
    FROM Users.Information as ui
    WHERE ui.UserID = @userGuid
  `);

	const userRoles = results.recordset[0] as { Role: string; ExtraRole: string };

	if (!userRoles) {
		return [];
	}

	const roles = [userRoles.Role, userRoles.ExtraRole].filter((r) => !!r || r.length > 0);
	return roles;
}

app.http('getUserRoles', {
	methods: ['POST'],
	authLevel: 'anonymous',
	handler: httpTrigger
});
