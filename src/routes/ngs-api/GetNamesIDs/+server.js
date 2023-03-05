import sql from "mssql";
import { json } from '@sveltejs/kit';

import * as dotenv from 'dotenv'

dotenv.config()

const config = {
	user: process.env.DB_USER, // better stored in an app setting such as process.env.DB_USER
	password: process.env.DB_PASSWORD, // better stored in an app setting such as process.env.DB_PASSWORD
	server: process.env.DB_SERVER, // better stored in an app setting such as process.env.DB_SERVER
	database: process.env.DB_NAME, // better stored in an app setting such as process.env.DB_NAME
	authentication: {
		type: 'default'
	},
	options: {
		encrypt: true
	}
}

export async function GET({ url }) {
	try {

        var poolConnection = await sql.connect(config);

		var sqlQuery = `

        SELECT
		[Players].[Information].[PlayerID],
        [Players].[Information].[PlayerName],
        [Players].[Information].[CharacterName]

        FROM Players.Information
        WHERE
        PlayerID != 106 AND PlayerID != 107
		
        ORDER BY PlayerName ASC`;
			
		var results = await poolConnection.request().query(sqlQuery);
		
		var returner = results.recordset;
		////console.log(returner);
		poolConnection.close();

		//returner = context.req.body;
		
        	// context.res.status(200).json(returner);
		return json(returner);
	
	}
	catch (err) {
		console.error(err.message);
	}
}
