import sql, { type Request } from 'mssql';

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
