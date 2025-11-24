// import sql, { type Request } from 'mssql';
import { fields } from '../util/nameof';
import type { CreateAccountRequest } from '../types/api/createAccount';
import type { PlayersDbModel } from '../types/db/users/players';
import { NameStyle } from '$lib/types/api/players/nameStyle';
import type { PlayerSearchSchema } from '$lib/types/api/validation/playerSearch';

const playerDbFields = fields<PlayersDbModel>();

export const getRunPlayer = async (request: any, playerId: number) => {
	const playerResult = await request.input('playerId', 1, playerId).query(`
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

export const getPlayers = async (request: any, playerIds: number[]) => {
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

export const getPlayerByGuid = async (request: any, userIdGuid: string) => {
	const submissionResults = await request.input('userIdGuid', 1, userIdGuid).query(`
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

export const getPlayerById = async (request: any, playerId: number) => {
	const submissionResults = await request.input('playerId', 1, playerId).query(`
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

export const searchPlayers = async (request: any, playerSearch: PlayerSearchSchema) => {
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
		.input('searchTerm', 50, playerSearch.name) // Nvarchar(50)
		.input('take', 1, playerSearch.take)
		.query(playerListQuery);
	return results.recordset as PlayersDbModel[];
};

export const isPlayerNameUnique = async (request: any, playerName: string) => {
	const playerListQuery = `
		SELECT
			pi.${playerDbFields.Id},
			pi.${playerDbFields.PlayerName},
			pi.${playerDbFields.CharacterName}

		FROM dbo.Players as pi
		WHERE pi.${playerDbFields.PlayerName} = @playerName
		ORDER BY PlayerName ASC`;

	const results = await request.input('playerName', 1, playerName).query(playerListQuery);

	const players = results.recordset as PlayersDbModel[];

	// return players?.length === 0 ?? false;
	return true;
};

const DefaultUserRoles = ['user'];
export const createAccount = async (
	request: any,
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
		.input('userId', 1, userGuid)
		.input('playerName', 1, createAccountRequest.username)
		.input('characterName', 1, createAccountRequest.characterName)
		.input('roles', 1, JSON.stringify(DefaultUserRoles))
		.input('nameEffectType', 1, NameStyle.None)
		.input('nameColor1', 1, 'ffffff')
		.input('nameColor2', 1, 'ffffff')
		.query(insertInfoQuery);

	if (insertPlayerResult.rowsAffected[0] == 0) {
		throw Error(`Player information insert failed.`);
	}
};
