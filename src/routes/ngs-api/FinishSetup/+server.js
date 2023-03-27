import sql from 'mssql';
import { json } from '@sveltejs/kit';

import * as dotenv from 'dotenv';

dotenv.config();

const config = {
	user: process.env.DB_SUBMIT_USER, // better stored in an app setting such as process.env.DB_USER
	password: process.env.DB_SUBMIT_PASSWORD, // better stored in an app setting such as process.env.DB_PASSWORD
	server: process.env.DB_SERVER, // better stored in an app setting such as process.env.DB_SERVER
	database: process.env.DB_NAME, // better stored in an app setting such as process.env.DB_NAME
	authentication: {
		type: 'default'
	},
	options: {
		encrypt: true
	}
};

export async function POST({ request }) {
	const data = await request.json();
	console.log(data);

	try {
		console.log('Test Passed');
		var CharacterName = data.setupName;
		var ServerID = data.setupServer;
		var PlayerName = data.setupPlayerName;
		var userID = data.setupUserID;

		var poolConnection = await sql.connect(config);

		var sqlTest = `
        
        SELECT UserID FROM Users.Information WHERE UserID = @test

        `;

		var testresults = await poolConnection
			.request()
			.input('test', sql.NVarChar, userID)
			.query(sqlTest);

		if (testresults.rowsAffected != 0) {
			poolConnection.close();
			return json({ what: 'who' });
		}

		sqlTest = `
        
        SELECT PlayerName FROM Players.Information WHERE PlayerName = @test AND PlayerID > 107

        `;

		var testresults = await poolConnection
			.request()
			.input('test', sql.NVarChar, PlayerName)
			.query(sqlTest);

		if (testresults.rowsAffected != 0) {
			poolConnection.close();
			return json({ what: 'who' });
		}

		var sqlAdd = `
        
        INSERT INTO Players.Information (PlayerName,CharacterName)
		VALUES (@PlayerName,@CharacterName)

        `;

		await poolConnection
			.request()
			.input('PlayerName', sql.NVarChar, PlayerName)
			.input('CharacterName', sql.NVarChar, CharacterName)
			.query(sqlAdd);

		sqlAdd = `SELECT PlayerID FROM Players.Information 
		WHERE PlayerName = @PlayerName 
		AND CharacterName = @CharacterName AND PlayerID > 107`;

		var results = await poolConnection
			.request()
			.input('PlayerName', sql.NVarChar, PlayerName)
			.input('CharacterName', sql.NVarChar, CharacterName)
			.query(sqlAdd);

		sqlAdd = `
        
        INSERT INTO Players.Customization(PlayerID,Server)
        VALUES(@pid,@server)

        `;

		await poolConnection
			.request()
			.input('pid', sql.Int, results.recordset[0].PlayerID)
			.input('server', sql.NVarChar, ServerID)
			.query(sqlAdd);

		sqlAdd = `
        
        INSERT INTO Users.Information(PlayerID,UserID,Role)
        VALUES(@pid,@uid,@newuser)

        `;

		await poolConnection
			.request()
			.input('pid', sql.Int, results.recordset[0].PlayerID)
			.input('uid', sql.NVarChar, userID)
			.input('newuser', sql.NVarChar, 'user')
			.query(sqlAdd);

		////console.log(returner);
		poolConnection.close();

		//returner = context.req.body;

		// context.res.status(200).json(returner);
		return json({ Successful: 'Aye' });
	} catch (err) {
		console.error(err.message);
	}
}
