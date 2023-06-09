import sql, { type Request } from 'mssql';
import type { PlayerInformationDbModel } from '../types/db/users/playerInformation';
import { fields } from '../util/nameof';

const playerInfoFields = fields<PlayerInformationDbModel>();

export const getRunPlayer = async (request: Request, playerId: number) => {
	const submissionResults = await request.input('playerId', sql.Int, playerId).query(`
    SELECT pi.PlayerId, pi.PlayerName
    FROM Players.Information as pi
    WHERE pi.PlayerID = @playerId;
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

export const getPlayerList = async (request: Request) => {
	const playerListQuery = `
		SELECT
		pi.${playerInfoFields.PlayerID},
		pi.${playerInfoFields.PlayerName},
		pi.${playerInfoFields.CharacterName}

		FROM Players.Information as pi
		WHERE pi.${playerInfoFields.PlayerID} != 106 AND pi.${playerInfoFields.PlayerID} != 107
		ORDER BY PlayerName ASC`;

	const results = await request.query(playerListQuery);
	return results.recordset as PlayerInformationDbModel[];
};
