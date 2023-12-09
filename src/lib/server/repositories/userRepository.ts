import { fields } from '../util/nameof';
import type { PlayersDbModel, PlayersDbModel2 } from '../types/db/users/players';
import type { Pool } from 'pg';

const playersDbFields = fields<PlayersDbModel>();

export const getUserExists = async (request: Pool, userGuid: string) => {
	const user = await getUser(request, userGuid);
	const playerId = parseInt(user?.user_id ?? '-1');
	return playerId > 0;
};

export const getUser = async (request: Pool, userGuid: string) => {
	const results = await request.query(
		`
			SELECT 
				pi.${playersDbFields.Id},
				pi.${playersDbFields.PlayerName},
				pi.${playersDbFields.UserId},
				pi.${playersDbFields.Roles}
			FROM dbo.Players AS pi
			WHERE pi.${playersDbFields.UserId} = $1
		`,
		[userGuid]
	);

	const user = results.rows[0] as PlayersDbModel2 | undefined;
	return user;
};

export const getUserRoles = async (pool: Pool, userGuid: string) => {
	const results = await pool.query(
		`
			SELECT 
        pi.${playersDbFields.Roles}
			FROM dbo.Players AS pi
			WHERE pi.${playersDbFields.UserId} = $1
		`,
		[userGuid]
	);
	const user = results.rows[0] as PlayersDbModel2 | undefined;

	if (!user) {
		return [];
	}

	return JSON.parse(user.roles) as string[];
};
