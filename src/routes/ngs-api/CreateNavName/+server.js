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

        var userID = data.get('asdf')
		var sqlQuery = `

        SELECT 

            pi.PlayerName,
            pi.CharacterName,

            pc.PreferredName,

            pc.NameType as NameType,
            pc.NameColor1 as NameColor1,
            pc.NameColor2 as NameColor2

        FROM Users.Information
        
        INNER JOIN
        Players.Information AS pi ON Users.Information.PlayerID = pi.PlayerID

        INNER JOIN
        Players.Customization AS pc ON Users.Information.PlayerID = pc.PlayerID

        WHERE UserID = @INuserID`;

		// @ts-ignore
		var results = await poolConnection.request().input('INuserID', sql.NVarChar, userID).query(sqlQuery);

		var returner = results.recordset;
        //console.log(returner)
        //if (returner[0].Avatar != null && returner[0].Avatar != '') {
        //    returner[0].Avatar = 'https://blobcdn.blob.core.windows.net/pso2cdn/userAvatars/' + returner[0].PlayerID + '.jpg';
        //}

        var me = returner[0];

        var out = await generateNames(me)
            
		////console.log(returner);
		// @ts-ignore
		poolConnection.close();

		//returner = context.req.body;
		
        // context.res.status(200).json(returner);

        return json(out);
	
	}
	catch (err) {
		// @ts-ignore
		console.error(err.message);
	}
}

async function generateNames(d) {
    switch (d.PreferredName) {
        // Main Character Name
        case 1:
            d.primaryNameOutput = d.CharacterName;
            d.secondaryNameOutput = d.PlayerName;
            break;
        // Run Character Name
        case 2:
            d.primaryNameOutput = d.CharacterName;
            d.secondaryNameOutput = d.PlayerName;
            break;
        // Player Name
        default:
            d.primaryNameOutput = d.PlayerName;
            d.secondaryNameOutput = d.CharacterName;
            break;
    }
    if (d.primaryNameOutput == null || d.primaryNameOutput == '') {
        d.primaryNameOutput = d.secondaryNameOutput;
    }

    if (d.PlayerID != (106 || 107)) {
        d.cssOutput = ``;
        switch (d.NameType) {
        case 1:
            d.cssOutput += `color: #` + d.NameColor1 + `;`
            break;
        case 2:
            d.cssOutput += `background: -webkit-linear-gradient(0deg, #` + d.NameColor1 + `, #` + d.NameColor2 + `);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;`;
            break;
        case 3:
            d.cssOutput += `color: #` + d.NameColor2 + `; text-shadow: 0px 0px 5px #` + d.NameColor1 + `, 0px 0px 5px #` + d.NameColor1 + `, 0px 0px 5px #` + d.NameColor1 + `;`;
            break;
        default:
            break;
        }
    }
    else {
        d.cssOutput = ``;
    }

    var array = {
    PlayerName: d.primaryNameOutput,
    PlayerStyle: d.cssOutput
    }
    return(array)

}