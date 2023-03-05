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

		var sqlQuery = `

        SELECT 

            run.RunCharacterName as VideoName,
            run.Notes as Notes,
            run.RunID,
            run.Link as Link,
            run.VideoTag as VideoTag,
            run.ModNotes as ModNotes,
            pi.PlayerName as PlayerName,
            pi.CharacterName as CharacterName,
            pc.Ship as Ship,
            pc.Server as Server,
            pc.Flag as Flag,

            pc.NameType as NameType,
            pc.NameColor1 as NameColor1,
            pc.NameColor2 as NameColor2,
            pc.PreferredName as NamePref,
            
            pi.Description as Description,
            pi.Youtube as Youtube,
            pi.Youtube2 as Youtube2,
            pi.Twitch as Twitch,
            pi.Twitter as Twitter,
            pi.Discord as Discord,

            si.PlayerName as SubPlayerName,
            si.CharacterName as SubCharacterName,

            sc.NameType as SubNameType,
            sc.NameColor1 as SubNameColor1,
            sc.NameColor2 as SubNameColor2,
            sc.PreferredName as SubNamePref,

            run.PlayerID as PlayerID,
            run.SubmitterID as SubPlayerID

        FROM DFAegis.Solo AS run
        
        INNER JOIN

        Players.Information AS pi ON run.PlayerID = pi.PlayerID

        INNER JOIN
        Players.Customization AS pc ON run.PlayerID = pc.PlayerID

        INNER JOIN
        Players.Information AS si ON run.SubmitterID = si.PlayerID

        INNER JOIN
        Players.Customization AS sc ON run.SubmitterID = sc.PlayerID

        WHERE RunID = @runID`;

		// @ts-ignore
		var results = await poolConnection.request().input('runID',sql.Int,data.get('GetRunID')).query(sqlQuery);

		var returner = results.recordset;
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