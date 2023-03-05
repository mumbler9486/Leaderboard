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
        [Players].[Information].[PlayerID],
        [Players].[Information].[PlayerName],
        [Players].[Information].[CharacterName],
        [Players].[Information].[Description],
        [Players].[Information].[Youtube],
        [Players].[Information].[Youtube2],
        [Players].[Information].[Twitch],
        [Players].[Information].[Twitter],
        [Players].[Information].[Discord],

        [Players].[Information].[Trophies],
        [Players].[Information].[AllianceID],

        PreferredName,
        Server,
        Ship,
        Flag,
        BackgroundType,
        BackgroundImage,
        BackgroundColor,
        NameType,
        NameColor1,
        NameColor2,
        Players.Customization.Avatar as Avatar,
        AvatarBan,
        DescriptionBan

    FROM Players.Information
        INNER JOIN
        Players.Customization ON Players.Customization.PlayerID = [Players].[Information].[PlayerID]

    WHERE
        Players.Information.PlayerID = @PlayerID`;

		// @ts-ignore
		var results = await poolConnection.request().input('PlayerID',sql.VarChar,data.get('id')).query(sqlQuery);

		var returner = results.recordset;
        //console.log(returner)
        //if (returner[0].Avatar != null && returner[0].Avatar != '') {
        //    returner[0].Avatar = 'https://blobcdn.blob.core.windows.net/pso2cdn/userAvatars/' + returner[0].PlayerID + '.jpg';
        //}
        if (returner[0].AllianceID != null && returner[0].AllianceID != '') {
            var params = '?aid=' + returner[0].AllianceID;
            const response = await fetch('http://localhost:5173/ngs-api/UserAllianceInfo' + params, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            });
    
            const d = await response.json();
            returner[0].AllianceName = d[0].AllianceName;
            returner[0].AllianceIcon = d[0].AllianceIcon;
        }
            switch (returner[0].ExtraRole) {
                case 'administrator':
                    returner[0].UserLevel = '101'
                    delete returner[0].ExtraRole
                    break
                case 'moderator':
                    returner[0].UserLevel = '201'
                    delete returner[0].ExtraRole
                    break
                default:
                    delete returner[0].ExtraRole
                    break
            }
            if(returner[0].Trophies != null && returner[0].Trophies != '') {
                returner[0].Trophies = returner[0].Trophies.split("/");
            }
            
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