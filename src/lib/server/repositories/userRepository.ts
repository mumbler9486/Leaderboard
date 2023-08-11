import sql, { Request } from 'mssql';
import type { UserInformationDbModel } from '../types/db/users/userInformation';
import { fields } from '../util/nameof';

const userInfoDbModel = fields<UserInformationDbModel>();

export const getUserExists = async (request: Request, userGuid: string) => {
	const user = await getUser(request, userGuid);
	const playerId = parseInt(user?.PlayerID ?? '-1');
	return playerId > 0;
};

export const getUser = async (request: Request, userGuid: string) => {
	const results = await request.input('userGuid', sql.NVarChar, userGuid).query(`
			SELECT 
				ui.${userInfoDbModel.PlayerID},
				ui.${userInfoDbModel.UserID},
				ui.${userInfoDbModel.Role},
				ui.${userInfoDbModel.ExtraRole}
			FROM Users.Information AS ui
			WHERE ui.${userInfoDbModel.UserID} = @userGuid
		`);
	const user = results.recordset[0] as UserInformationDbModel | undefined;
	return user;
};

export const getUserRoles = async (request: Request, userGuid: string) => {
	const results = await request.input('userGuid', sql.NVarChar, userGuid).query(`
			SELECT 
        ui.${userInfoDbModel.Role},
        ui.${userInfoDbModel.ExtraRole}
			FROM Users.Information AS ui
			WHERE ui.${userInfoDbModel.UserID} = @userGuid
		`);
	const user = results.recordset[0] as UserInformationDbModel;

	if (!user) {
		return [];
	}

	return [user.Role, user.ExtraRole].filter((r) => !!r);
};
