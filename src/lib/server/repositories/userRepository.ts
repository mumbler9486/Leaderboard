import { fields } from '../util/nameof';
import type { PlayersDbModel2 } from '../types/db/users/players';
import type { Pool } from 'pg';

const playersDbFields = fields<PlayersDbModel2>();

export const getUserExists = async (request: Pool, userGuid: string) => {
	const user = await getUser(request, userGuid);
	const playerId = parseInt(user?.user_id ?? '-1');
	return playerId > 0;
};

export const getUser = async (request: Pool, userGuid: string) => {
	const results = await request.query(
		`
			SELECT 
				pi.${playersDbFields.id},
				pi.${playersDbFields.player_name},
				pi.${playersDbFields.user_id},
				pi.${playersDbFields.roles}
			FROM players AS pi
			WHERE pi.${playersDbFields.user_id} = $1
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
        pi.${playersDbFields.roles}
			FROM players AS pi
			WHERE pi.${playersDbFields.user_id} = $1
		`,
		[userGuid]
	);
	const user = results.rows[0] as PlayersDbModel2 | undefined;

	if (!user) {
		return [];
	}

	return JSON.parse(user.roles) as string[];
};
