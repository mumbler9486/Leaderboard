import sql, { ConnectionPool, type Request } from 'mssql';
import type {
	PlayerCustomizationDbModel,
	PlayerInformationDbModel
} from '../types/db/users/playerInformation';
import { fields } from '../util/nameof';
import type { UserInformationDbModel } from '../types/db/users/userInformation';
import type { CreateAccountRequest } from '../types/api/createAccount';

const playerInfoDbFields = fields<PlayerInformationDbModel>();
const playerCustomizationDbFields = fields<PlayerCustomizationDbModel>();
const userInfoDbModel = fields<UserInformationDbModel>();

export const getRunPlayer = async (request: Request, playerId: number) => {
	const submissionResults = await request.input('playerId', sql.Int, playerId).query(`
    SELECT pi.${playerInfoDbFields.PlayerID}, pi.${playerInfoDbFields.PlayerName}
    FROM Players.Information as pi
    WHERE pi.${playerInfoDbFields.PlayerID} = @playerId;
		`);

	if (!submissionResults.recordset[0]) {
		return { playerId: 0, playerName: undefined };
	}

	const player = submissionResults.recordset[0];
	return {
		playerId: parseInt(player.PlayerId),
		playerName: player.PlayerName as string
	};
};

export const getPlayerByGuid = async (request: Request, userIdGuid: string) => {
	const submissionResults = await request.input('userIdGuid', sql.NVarChar, userIdGuid).query(`
			SELECT
				pi.${playerInfoDbFields.PlayerName},
				pi.${playerInfoDbFields.PlayerID},
				pi.${playerInfoDbFields.CharacterName},
				pi.${playerInfoDbFields.Description},
				pi.${playerInfoDbFields.Youtube},
				pi.${playerInfoDbFields.Twitch},
				pi.${playerInfoDbFields.Twitter},
				pi.${playerInfoDbFields.Discord},
				pi.${playerInfoDbFields.Trophies},

				pc.${playerCustomizationDbFields.PreferredName},
				pc.${playerCustomizationDbFields.Server},
				pc.${playerCustomizationDbFields.Ship},
				pc.${playerCustomizationDbFields.Flag},
				pc.${playerCustomizationDbFields.NameType},
				pc.${playerCustomizationDbFields.NameColor1},
				pc.${playerCustomizationDbFields.NameColor2}

			FROM Users.Information AS ui
			INNER JOIN Players.Information AS pi ON pi.${playerInfoDbFields.PlayerID} = ui.${userInfoDbModel.PlayerID}
			INNER JOIN Players.Customization AS pc ON pc.${playerCustomizationDbFields.PlayerID} = pi.${playerInfoDbFields.PlayerID}
			WHERE ui.${userInfoDbModel.UserID} = @userIdGuid
		`);

	const player = submissionResults.recordset[0] as
		| (PlayerCustomizationDbModel & PlayerInformationDbModel)
		| undefined;
	return player;
};

export const getPlayerById = async (request: Request, playerId: number) => {
	const submissionResults = await request.input('playerId', sql.Int, playerId).query(`
			SELECT
				pi.${playerInfoDbFields.PlayerName},
				pi.${playerInfoDbFields.PlayerID},
				pi.${playerInfoDbFields.CharacterName},
				pi.${playerInfoDbFields.Description},
				pi.${playerInfoDbFields.Youtube},
				pi.${playerInfoDbFields.Twitch},
				pi.${playerInfoDbFields.Twitter},
				pi.${playerInfoDbFields.Discord},
				pi.${playerInfoDbFields.Trophies},

				pc.${playerCustomizationDbFields.PreferredName},
				pc.${playerCustomizationDbFields.Server},
				pc.${playerCustomizationDbFields.Ship},
				pc.${playerCustomizationDbFields.Flag},
				pc.${playerCustomizationDbFields.NameType},
				pc.${playerCustomizationDbFields.NameColor1},
				pc.${playerCustomizationDbFields.NameColor2}

			FROM Players.Information AS pi
			INNER JOIN Players.Customization AS pc ON pc.${playerCustomizationDbFields.PlayerID} = pi.${playerInfoDbFields.PlayerID}
			WHERE pi.${userInfoDbModel.PlayerID} = @playerId
		`);

	const player = submissionResults.recordset[0] as
		| (PlayerCustomizationDbModel & PlayerInformationDbModel)
		| undefined;
	return player;
};

export const getPlayerList = async (request: Request) => {
	const playerListQuery = `
		SELECT
		pi.${playerInfoDbFields.PlayerID},
		pi.${playerInfoDbFields.PlayerName},
		pi.${playerInfoDbFields.CharacterName}

		FROM Players.Information as pi
		WHERE pi.${playerInfoDbFields.PlayerID} != 106 AND pi.${playerInfoDbFields.PlayerID} != 107
		ORDER BY PlayerName ASC`;

	const results = await request.query(playerListQuery);
	return results.recordset as PlayerInformationDbModel[];
};

const DefaultUserRole = 'user';
export const createAccount = async (
	transaction: sql.Transaction,
	createAccountRequest: CreateAccountRequest
) => {
	const request = await transaction.request();
	const insertInfoQuery = `
		INSERT INTO Players.Information (${playerInfoDbFields.PlayerName},${playerInfoDbFields.CharacterName})
		VALUES (@playerName,@characterName);
		SELECT SCOPE_IDENTITY() AS LastID
	`;

	// Insert player info
	const insertPlayerResult = await request
		.input('playerName', sql.NVarChar, createAccountRequest.username)
		.input('characterName', sql.NVarChar, createAccountRequest.characterName)
		.query(insertInfoQuery);

	if (insertPlayerResult.rowsAffected[0] == 0) {
		throw Error(`Player information insert failed.`);
	}

	const insertedPlayerId = parseInt(insertPlayerResult.recordset[0].LastID);

	// Insert customization and info
	const insertUserQuery = `
		INSERT INTO Players.Customization(PlayerID,Server)
		VALUES(@playerId,@server);

		INSERT INTO Users.Information(PlayerID,UserID,Role)
		VALUES(@playerId,@userGuid,@userRole);
	`;

	const insertUserResult = await request
		.input('playerId', sql.Int, insertedPlayerId)
		.input('server', sql.NVarChar, createAccountRequest.serverRegion)
		.input('userGuid', sql.NVarChar, createAccountRequest.userId)
		.input('userRole', sql.NVarChar, DefaultUserRole)
		.query(insertUserQuery);

	if (insertUserResult.rowsAffected[0] == 0) {
		throw Error(`Player customization and user information insert failed.`);
	}
};
