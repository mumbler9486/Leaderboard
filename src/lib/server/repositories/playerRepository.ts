import sql, { type Request } from 'mssql';
import { fields } from '../util/nameof';
import type { CreateAccountRequest } from '../types/api/createAccount';
import type { PlayersDbModel } from '../types/db/users/players';
import { NameStyle } from '$lib/types/api/players/nameStyle';
import type { PlayerSearchSchema } from '$lib/types/api/validation/playerSearch';

const playerDbFields = fields<PlayersDbModel>();

export const getRunPlayer = async (request: Request, playerId: number) => {
	const playerResult = await request.input('playerId', sql.Int, playerId).query(`
    SELECT
			pi.${playerDbFields.Id}, 
			pi.${playerDbFields.PlayerName}
    FROM dbo.Players as pi
    WHERE pi.${playerDbFields.Id} = @playerId;
		`);

	if (!playerResult.recordset[0]) {
		return { playerId: 0, playerName: undefined };
	}

	const player = playerResult.recordset[0];
	return {
		playerId: parseInt(player.PlayerId),
		playerName: player.PlayerName as string,
	};
};

export const getPlayers = async (request: Request, playerIds: number[]) => {
	let playerLookupRequest = request;

	const paramNames: string[] = [];
	playerIds.forEach((pid, i) => {
		const paramName = `playerId${i}`;
		paramNames.push(paramName);
		playerLookupRequest = playerLookupRequest.input(paramName, pid);
	});

	const paramList = paramNames.map((p) => `@${p}`);
	const playerLookupResults = await playerLookupRequest.query(`
    SELECT 
			pi.${playerDbFields.Id},
			pi.${playerDbFields.PlayerName}
		FROM dbo.Players AS pi
		WHERE pi.${playerDbFields.Id} IN (${paramList.join(',')})
  `);

	const players = playerLookupResults.recordset as PlayersDbModel[];

	return players.map((p) => ({
		playerId: parseInt(p.Id),
		playerName: p.PlayerName as string,
	}));
};

export const getPlayerByGuid = async (request: Request, userIdGuid: string) => {
	const submissionResults = await request.input('userIdGuid', sql.NVarChar, userIdGuid).query(`
			SELECT
				pi.${playerDbFields.Id},
				pi.${playerDbFields.PlayerName},
				pi.${playerDbFields.CharacterName},
				pi.${playerDbFields.Bio},
				pi.${playerDbFields.Youtube},
				pi.${playerDbFields.Twitch},
				pi.${playerDbFields.Discord},
				pi.${playerDbFields.Twitter},
				pi.${playerDbFields.Trophies},
				pi.${playerDbFields.PreferredNameType},
				pi.${playerDbFields.Server},
				pi.${playerDbFields.Ship},
				pi.${playerDbFields.Flag},
				pi.${playerDbFields.NameEffectType},
				pi.${playerDbFields.NameColor1},
				pi.${playerDbFields.NameColor2}

			FROM dbo.Players AS pi
			WHERE pi.${playerDbFields.UserId} = @userIdGuid
		`);

	const player = submissionResults.recordset[0] as PlayersDbModel | undefined;
	return player;
};

export const getPlayerById = async (request: Request, playerId: number) => {
	const submissionResults = await request.input('playerId', sql.Int, playerId).query(`
			SELECT
				pi.${playerDbFields.Id},
				pi.${playerDbFields.PlayerName},
				pi.${playerDbFields.CharacterName},
				pi.${playerDbFields.Bio},
				pi.${playerDbFields.Youtube},
				pi.${playerDbFields.Twitch},
				pi.${playerDbFields.Discord},
				pi.${playerDbFields.Twitter},
				pi.${playerDbFields.Trophies},
				pi.${playerDbFields.PreferredNameType},
				pi.${playerDbFields.Server},
				pi.${playerDbFields.Ship},
				pi.${playerDbFields.Flag},
				pi.${playerDbFields.NameEffectType},
				pi.${playerDbFields.NameColor1},
				pi.${playerDbFields.NameColor2}

			FROM dbo.Players AS pi
			WHERE pi.${playerDbFields.Id} = @playerId
		`);

	const player = submissionResults.recordset[0] as PlayersDbModel | undefined;
	return player;
};

export const searchPlayers = async (request: Request, playerSearch: PlayerSearchSchema) => {
	const playerListQuery = `
		SELECT
			pi.${playerDbFields.Id},
			pi.${playerDbFields.PlayerName},
			pi.${playerDbFields.CharacterName},
			pi.${playerDbFields.PreferredNameType},
			pi.${playerDbFields.Server},
			pi.${playerDbFields.Ship},
			pi.${playerDbFields.Flag},
			pi.${playerDbFields.NameEffectType},
			pi.${playerDbFields.NameColor1},
			pi.${playerDbFields.NameColor2}

		FROM dbo.Players as pi
		WHERE pi.${playerDbFields.PlayerName} LIKE '%' + @searchTerm + '%'
		ORDER BY PlayerName ASC
		OFFSET 0 ROWS
		FETCH NEXT @take ROWS ONLY;`;

	const results = await request
		.input('searchTerm', sql.NVarChar(50), playerSearch.name)
		.input('take', sql.Int, playerSearch.take)
		.query(playerListQuery);
	return results.recordset as PlayersDbModel[];
};

export const isPlayerNameUnique = async (request: Request, playerName: string) => {
	const playerListQuery = `
		SELECT
			pi.${playerDbFields.Id},
			pi.${playerDbFields.PlayerName},
			pi.${playerDbFields.CharacterName}

		FROM dbo.Players as pi
		WHERE pi.${playerDbFields.PlayerName} = @playerName
		ORDER BY PlayerName ASC`;

	const results = await request
		.input('playerName', sql.NVarChar, playerName)
		.query(playerListQuery);

	const players = results.recordset as PlayersDbModel[];

	return players?.length === 0 ?? false;
};

const DefaultUserRoles = ['user'];
export const createAccount = async (
	request: Request,
	userGuid: string,
	createAccountRequest: CreateAccountRequest
) => {
	const insertInfoQuery = `
		INSERT INTO dbo.Players (
			${playerDbFields.UserId},
			${playerDbFields.PlayerName},
			${playerDbFields.CharacterName},
			${playerDbFields.Roles},
			${playerDbFields.NameEffectType},
			${playerDbFields.NameColor1},
			${playerDbFields.NameColor2}
		)
		VALUES (
			@userId,
			@playerName,
			@characterName,
			@roles,
			@nameEffectType,
			@nameColor1,
			@nameColor2
		);
	`;

	// Insert player info
	const insertPlayerResult = await request
		.input('userId', sql.NVarChar, userGuid)
		.input('playerName', sql.NVarChar, createAccountRequest.username)
		.input('characterName', sql.NVarChar, createAccountRequest.characterName)
		.input('roles', sql.NVarChar, JSON.stringify(DefaultUserRoles))
		.input('nameEffectType', sql.TinyInt, NameStyle.None)
		.input('nameColor1', sql.NVarChar, 'ffffff')
		.input('nameColor2', sql.NVarChar, 'ffffff')
		.query(insertInfoQuery);

	if (insertPlayerResult.rowsAffected[0] == 0) {
		throw Error(`Player information insert failed.`);
	}
};
