import sql, { Request } from 'mssql';
import { fields } from '../util/nameof';
import type { PlayersDbModel } from '../types/db/users/players';

const playersDbFields = fields<PlayersDbModel>();

export const getUserExists = async (request: Request, userGuid: string) => {
	const user = await getUser(request, userGuid);
	const playerId = parseInt(user?.UserId ?? '-1');
	return playerId > 0;
};

export const getUser = async (request: Request, userGuid: string) => {
	const results = await request.input('userGuid', sql.NVarChar, userGuid).query(`
			SELECT 
				pi.${playersDbFields.Id},
				pi.${playersDbFields.PlayerName},
				pi.${playersDbFields.UserId},
				pi.${playersDbFields.Roles}
			FROM dbo.Players AS pi
			WHERE pi.${playersDbFields.UserId} = @userGuid
		`);
	const user = results.recordset[0] as PlayersDbModel | undefined;
	return user;
};

export const getUserRoles = async (request: Request, userGuid: string) => {
	const results = await request.input('userGuid', sql.NVarChar, userGuid).query(`
			SELECT 
        pi.${playersDbFields.Roles}
			FROM dbo.Players AS pi
			WHERE pi.${playersDbFields.UserId} = @userGuid
		`);
	const user = results.recordset[0] as PlayersDbModel | undefined;

	if (!user) {
		return [];
	}

	return JSON.parse(user.Roles) as string[];
};
