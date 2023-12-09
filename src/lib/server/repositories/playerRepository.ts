import { fields } from '../util/nameof';
import type { CreateAccountRequest } from '../types/api/createAccount';
import type { PlayersDbModel2 } from '../types/db/users/players';
import { NameStyle } from '$lib/types/api/players/nameStyle';
import type { Pool } from 'pg';

const playerDbFields = fields<PlayersDbModel2>();

export const getRunPlayer = async (pool: Pool, playerId: number) => {
	const playerResult = await pool.query(
		`
    SELECT
			pi.${playerDbFields.id}, 
			pi.${playerDbFields.player_name}
    FROM dbo.Players as pi
    WHERE pi.${playerDbFields.id} = $1;
		`,
		[playerId]
	);

	if (playerResult.rowCount === 0) {
		return { playerId: 0, playerName: undefined };
	}

	const player = playerResult.rows[0];
	return {
		playerId: parseInt(player.PlayerId),
		playerName: player.PlayerName as string,
	};
};

export const getPlayers = async (pool: Pool, playerIds: number[]) => {
	const playerLookupResults = await pool.query(
		`
    SELECT 
			pi.${playerDbFields.id},
			pi.${playerDbFields.player_name}
		FROM dbo.Players AS pi
		WHERE pi.${playerDbFields.id} IN ($1::int[])
  `,
		playerIds
	);

	const players = playerLookupResults.rows as PlayersDbModel2[];

	return players.map((p) => ({
		playerId: p.id,
		playerName: p.player_name as string,
	}));
};

export const getPlayerByGuid = async (pool: Pool, userIdGuid: string) => {
	const submissionResults = await pool.query(
		`
			SELECT
				pi.${playerDbFields.id},
				pi.${playerDbFields.player_name},
				pi.${playerDbFields.character_name},
				pi.${playerDbFields.bio},
				pi.${playerDbFields.youtube},
				pi.${playerDbFields.twitch},
				pi.${playerDbFields.discord},
				pi.${playerDbFields.twitter},
				pi.${playerDbFields.trophies},
				pi.${playerDbFields.preferred_name_type},
				pi.${playerDbFields.server},
				pi.${playerDbFields.ship},
				pi.${playerDbFields.flag},
				pi.${playerDbFields.name_effect_type},
				pi.${playerDbFields.name_color1},
				pi.${playerDbFields.name_color2}

			FROM players AS pi
			WHERE pi.${playerDbFields.user_id} = $1
		`,
		[userIdGuid]
	);

	const player = submissionResults.rows[0] as PlayersDbModel2 | undefined;
	return player;
};

export const getPlayerById = async (pool: Pool, playerId: number) => {
	const playerResult = await pool.query(
		`
			SELECT
				pi.${playerDbFields.id},
				pi.${playerDbFields.player_name},
				pi.${playerDbFields.character_name},
				pi.${playerDbFields.bio},
				pi.${playerDbFields.youtube},
				pi.${playerDbFields.twitch},
				pi.${playerDbFields.discord},
				pi.${playerDbFields.twitter},
				pi.${playerDbFields.trophies},
				pi.${playerDbFields.preferred_name_type},
				pi.${playerDbFields.server},
				pi.${playerDbFields.ship},
				pi.${playerDbFields.flag},
				pi.${playerDbFields.name_effect_type},
				pi.${playerDbFields.name_color1},
				pi.${playerDbFields.name_color2}

			FROM players AS pi
			WHERE pi.${playerDbFields.id} = $1
		`,
		[playerId]
	);

	const player = playerResult.rows[0] as PlayersDbModel2 | undefined;
	return player;
};

export const getPlayerList = async (pool: Pool) => {
	const playerListQuery = `
		SELECT
			pi.${playerDbFields.id},
			pi.${playerDbFields.player_name},
			pi.${playerDbFields.character_name}

		FROM dbo.Players as pi
		ORDER BY PlayerName ASC`;

	const results = await pool.query(playerListQuery);
	return results.rows as PlayersDbModel2[];
};

export const isPlayerNameUnique = async (pool: Pool, playerName: string) => {
	const playerListQuery = `
		SELECT
			pi.${playerDbFields.id},
			pi.${playerDbFields.player_name},
			pi.${playerDbFields.character_name}

		FROM dbo.Players as pi
		WHERE pi.${playerDbFields.player_name} = $1
		ORDER BY PlayerName ASC`;

	const results = await pool.query(playerListQuery, [playerName]);

	return results?.rowCount === 0 ?? false;
};

const DefaultUserRoles = ['user'];
export const createAccount = async (
	pool: Pool,
	userGuid: string,
	createAccountRequest: CreateAccountRequest
) => {
	const insertInfoQuery = `
		INSERT INTO dbo.Players (
			${playerDbFields.user_id},
			${playerDbFields.player_name},
			${playerDbFields.character_name},
			${playerDbFields.roles},
			${playerDbFields.name_effect_type},
			${playerDbFields.name_color1},
			${playerDbFields.name_color2}
		)
		VALUES (
			$1,
			$2,
			$3,
			$4,
			$5,
			$6,
			$7
		);
	`;

	// Insert player info
	const insertPlayerResult = await pool.query(insertInfoQuery, [
		userGuid,
		createAccountRequest.username,
		createAccountRequest.characterName,
		JSON.stringify(DefaultUserRoles),
		NameStyle.None,
		'ffffff',
		'ffffff',
	]);

	if (insertPlayerResult.rowCount == 0) {
		throw Error(`Player information insert failed.`);
	}
};
