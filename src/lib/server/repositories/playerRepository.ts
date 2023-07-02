import sql, { type Request } from 'mssql';
import type {
	PlayerCustomizationDbModel,
	PlayerInformationDbModel
} from '../types/db/users/playerInformation';
import { fields } from '../util/nameof';
import type { UserInformationDbModel } from '../types/db/users/userInformation';

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

export const getPlayer = async (request: Request, userIdGuid: string) => {
	const submissionResults = await request.input('userIdGuid', sql.NVarChar, userIdGuid).query(`
			SELECT
				pi.${playerInfoDbFields.PlayerName},
				pi.${playerInfoDbFields.PlayerID},
				pi.${playerInfoDbFields.CharacterName},
				pi.${playerInfoDbFields.Description},
				pi.${playerInfoDbFields.Youtube},
				pi.${playerInfoDbFields.Youtube2},
				pi.${playerInfoDbFields.Twitch},
				pi.${playerInfoDbFields.Twitter},
				pi.${playerInfoDbFields.Discord},

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
