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
		
        var patchQuery = ` AND Patch = '60R'`;
        var serverQuery = ``;
        var classQuery = '';
        var videoQuery = ` AND NOT COALESCE(VideoTag,'none') = 'partial'`;

        // console.log(data);

        if (data.get('patch') != null && data.get('patch') != '') {
            if (data.get('patch') == 'P60') {
                patchQuery = ` AND Patch IS NULL`;
            }
            else {
                patchQuery = ' AND Patch = @PatchInput';
            }
            
        };
        if (data.get('videos') != null && data.get('videos') != '') {
            if (data.get('videos') == '1') {
                videoQuery = ``;
            }
        };
        if (data.get('class') != null && data.get('class') != '') {
            classQuery = ' AND MainClass = @ClassInput';
        };
        if (data.get('server') != null && data.get('server') != '') {
            serverQuery = ' AND Server = @ServerInput';
        };

		var sqlQuery = `

        SELECT
        [Players].[Information].[PlayerID],
        [Players].[Information].[PlayerName],
        [Players].[Information].[CharacterName],
        [Players].[Information].[Description],
        [Players].[Information].[Youtube],
        [Players].[Information].[Twitch],
        [Players].[Information].[Twitter],
        [Players].[Information].[Discord],

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
        VideoTag,

        RunID,
        [RunCharacterName],
        ShipOverride,
        MainClass,
        SubClass,
        CONCAT_WS(' ', WeaponInfo1, WeaponInfo2, WeaponInfo3, WeaponInfo4, WeaponInfo5, WeaponInfo6) as WeaponInfo,
        CONVERT(VARCHAR(5), time, 108) as Time,
        Link,
        Notes,
        CONCAT_WS('CONCAT_WS.SW_TACNOC',[Players].[Information].[PlayerID],MainClass,SubClass) as Filtration


    FROM Purples.Solo, Players.Information
        INNER JOIN
        Players.Customization ON Players.Customization.PlayerID = [Players].[Information].[PlayerID]

    WHERE
        Players.Information.PlayerID = Purples.Solo.PlayerID
        AND
        Rank = @RankInput
        AND
        Region = @RegionInput
        ` + classQuery + patchQuery + serverQuery + videoQuery + `
        
    ORDER BY time ASC, SubmissionTime ASC`;

		// @ts-ignore
		var results = await poolConnection.request().input('ServerInput',sql.VarChar,data.get('server')).input('ClassInput',sql.VarChar,data.get('class')).input('PatchInput',sql.VarChar,data.get('patch')).input('RegionInput',sql.VarChar,data.get('region')).input('RankInput', sql.Int, data.get('rank')).query(sqlQuery);

		var returner = results.recordset;
		//console.log(returner);
		// @ts-ignore
		// poolConnection.close();

		//returner = context.req.body;
		
        // context.res.status(200).json(returner);

        if(!data.get('weapons')) {
            var temp=[ ]
            returner=returner.filter((item)=>{
                if(!temp.includes(item.Filtration)){
                    temp.push(item.Filtration)
                    return true;
                }
            })
        }

        return json(returner);
	
	}
	catch (err) {
		// @ts-ignore
		console.error(err.message);
	}
}