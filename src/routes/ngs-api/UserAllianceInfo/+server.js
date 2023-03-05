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

// @ts-ignore
// @ts-ignore
export async function GET({ url }) {
    const data = await url.searchParams;
	try {
		// @ts-ignore
		var poolConnection = await sql.connect(config);

        // //console.log(data);

		var sqlQuery = `

        SELECT
        AllianceID,
        AllianceName,
        AllianceIcon

    FROM Alliances.Information

    WHERE
        Alliances.Information.AllianceID = @AID`;

		// @ts-ignore
		var results = await poolConnection.request().input('AID',sql.VarChar,data.get('aid')).query(sqlQuery);

		var returner = results.recordset;
        //if (returner[0].AllianceIcon != null && returner[0].AllianceIcon != '') {
        //    returner[0].AllianceIcon = 'https://blobcdn.blob.core.windows.net/pso2cdn/allianceIcons/' + returner[0].AllianceID + '.png';
        //}
		////console.log(returner);
		// @ts-ignore
		// poolConnection.close();

		//returner = context.req.body;
		
        // context.res.status(200).json(returner);

        return json(returner);
	
	}
	catch (err) {
		// @ts-ignore
		console.error(err.message);
	}
}