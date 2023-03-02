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
        COALESCE(STRING_AGG(runPlayers.RunCharacterName, '-coalesce|string|agg-'),'') as RunCharacterName,
        COALESCE(STRING_AGG(runPlayers.MainClass, '-coalesce|string|agg-'),'') as MainClass,
        COALESCE(STRING_AGG(runPlayers.SubClass, '-coalesce|string|agg-'),'') as SubClass,
        STRING_AGG(COALESCE(runPlayers.LinkPOV, 'partynull'), '-coalesce|string|agg-') as LinkPOV,
        MAX(run.Notes) as Notes,
        MAX(run.RunID) as RunID,

        STRING_AGG(pi.[PlayerID], '-coalesce|string|agg-') as PlayerID,
        STRING_AGG(pi.[PlayerName], '-coalesce|string|agg-') as PlayerName,
        STRING_AGG(COALESCE(pi.[CharacterName], 'partynull'), '-coalesce|string|agg-') as CharacterName,

        STRING_AGG(pc.PreferredName, '-coalesce|string|agg-') as PreferredName,
        STRING_AGG(COALESCE(pc.Server, 'partynull'), '-coalesce|string|agg-') as Server,
        STRING_AGG(COALESCE(pc.Ship, '99'), '-coalesce|string|agg-') as Ship,
        STRING_AGG(COALESCE(pc.Flag, 'partynull'), '-coalesce|string|agg-') as Flag,
        STRING_AGG(COALESCE(pc.NameType, '99'), '-coalesce|string|agg-') as NameType,
        STRING_AGG(COALESCE(pc.NameColor1, 'partynull'), '-coalesce|string|agg-') as NameColor1,
        STRING_AGG(COALESCE(pc.NameColor2, 'partynull'), '-coalesce|string|agg-') as NameColor2,

        MAX(si.[PlayerID]) as sPlayerID,
        MAX(si.[PlayerName]) as sPlayerName,
        MAX(si.[CharacterName]) as sCharacterName,

        MAX(sc.PreferredName) as sPreferredName,
        MAX(sc.Server) as sServer,
        MAX(sc.Ship) as sShip,
        MAX(sc.Flag) as sFlag,
        MAX(sc.NameType) as sNameType,
        MAX(sc.NameColor1) as sNameColor1,
        MAX(sc.NameColor2) as sNameColor2,

        MAX(run.ModNotes) as ModNotes


        FROM Purples.Party as run
        INNER JOIN
        Purples.PartyRunners as runPlayers ON run.RunID = runPlayers.RunID
        INNER JOIN
        Players.Information as pi ON runPlayers.PlayerID = pi.PlayerID
        INNER JOIN
        Players.Information as si ON run.SubmitterID = si.PlayerID
        INNER JOIN
        Players.Customization as pc ON runPlayers.PlayerID = pc.PlayerID
        INNER JOIN
        Players.Customization as sc ON runPlayers.PlayerID = sc.PlayerID

        WHERE
        run.RunID = @runID
        
        GROUP BY run.RunID`;

		// @ts-ignore
		var results = await poolConnection.request().input('runID',sql.Int,data.get('GetRunID')).query(sqlQuery);

		var returner = results.recordset;
        var returnArray = [];
        returner.forEach(data => {
            var dataReturn = {
                p1: { 
                    PlayerID: data.PlayerID.split('-coalesce|string|agg-')[0],
                    PlayerName: data.PlayerName.split('-coalesce|string|agg-')[0],
                    CharacterName: data.CharacterName.split('-coalesce|string|agg-')[0] == 'partynull' ? null : data.CharacterName.split('-coalesce|string|agg-')[0],
                    PreferredName: data.PreferredName.split('-coalesce|string|agg-')[0],
                    RunCharacterName: data.RunCharacterName.split('-coalesce|string|agg-')[0],
                    MainClass: data.MainClass.split('-coalesce|string|agg-')[0],
                    SubClass: data.SubClass.split('-coalesce|string|agg-')[0],
                    LinkPOV: data.LinkPOV.split('-coalesce|string|agg-')[0] == 'partynull' ? null : data.LinkPOV.split('-coalesce|string|agg-')[0],
                    Server: data.Server.split('-coalesce|string|agg-')[0] == 'partynull' ? null : data.Server.split('-coalesce|string|agg-')[0],
                    Ship: data.Ship.split('-coalesce|string|agg-')[0] == '99' ? null : data.Ship.split('-coalesce|string|agg-')[0],
                    Flag: data.Flag.split('-coalesce|string|agg-')[0] == 'partynull' ? null : data.Flag.split('-coalesce|string|agg-')[0],
                    NameType: data.NameType.split('-coalesce|string|agg-')[0] == '99' ? null : data.NameType.split('-coalesce|string|agg-')[0],
                    NameColor1: data.NameColor1.split('-coalesce|string|agg-')[0] == 'partynull' ? null : data.NameColor1.split('-coalesce|string|agg-')[0],
                    NameColor2: data.NameColor2.split('-coalesce|string|agg-')[0] == 'partynull' ? null : data.NameColor2.split('-coalesce|string|agg-')[0]
                },
                p2: {
                    PlayerID: data.PlayerID.split('-coalesce|string|agg-')[1],
                    PlayerName: data.PlayerName.split('-coalesce|string|agg-')[1],
                    CharacterName: data.CharacterName.split('-coalesce|string|agg-')[1] == 'partynull' ? null : data.CharacterName.split('-coalesce|string|agg-')[1],
                    PreferredName: data.PreferredName.split('-coalesce|string|agg-')[1],
                    RunCharacterName: data.RunCharacterName.split('-coalesce|string|agg-')[1],
                    MainClass: data.MainClass.split('-coalesce|string|agg-')[1],
                    SubClass: data.SubClass.split('-coalesce|string|agg-')[1],
                    LinkPOV: data.LinkPOV.split('-coalesce|string|agg-')[1] == 'partynull' ? null : data.LinkPOV.split('-coalesce|string|agg-')[1],
                    Server: data.Server.split('-coalesce|string|agg-')[1] == 'partynull' ? null : data.Server.split('-coalesce|string|agg-')[1],
                    Ship: data.Ship.split('-coalesce|string|agg-')[1] == '99' ? null : data.Ship.split('-coalesce|string|agg-')[1],
                    Flag: data.Flag.split('-coalesce|string|agg-')[1] == 'partynull' ? null : data.Flag.split('-coalesce|string|agg-')[1],
                    NameType: data.NameType.split('-coalesce|string|agg-')[1] == '99' ? null : data.NameType.split('-coalesce|string|agg-')[1],
                    NameColor1: data.NameColor1.split('-coalesce|string|agg-')[1] == 'partynull' ? null : data.NameColor1.split('-coalesce|string|agg-')[1],
                    NameColor2: data.NameColor2.split('-coalesce|string|agg-')[1] == 'partynull' ? null : data.NameColor2.split('-coalesce|string|agg-')[1]
                },
                p3: {
                    PlayerID: data.PlayerID.split('-coalesce|string|agg-')[2],
                    PlayerName: data.PlayerName.split('-coalesce|string|agg-')[2],
                    CharacterName: data.CharacterName.split('-coalesce|string|agg-')[2] == 'partynull' ? null : data.CharacterName.split('-coalesce|string|agg-')[2],
                    PreferredName: data.PreferredName.split('-coalesce|string|agg-')[2],
                    RunCharacterName: data.RunCharacterName.split('-coalesce|string|agg-')[2],
                    MainClass: data.MainClass.split('-coalesce|string|agg-')[2],
                    SubClass: data.SubClass.split('-coalesce|string|agg-')[2],
                    LinkPOV: data.LinkPOV.split('-coalesce|string|agg-')[2] == 'partynull' ? null : data.LinkPOV.split('-coalesce|string|agg-')[2],
                    Server: data.Server.split('-coalesce|string|agg-')[2] == 'partynull' ? null : data.Server.split('-coalesce|string|agg-')[2],
                    Ship: data.Ship.split('-coalesce|string|agg-')[2] == '99' ? null : data.Ship.split('-coalesce|string|agg-')[2],
                    Flag: data.Flag.split('-coalesce|string|agg-')[2] == 'partynull' ? null : data.Flag.split('-coalesce|string|agg-')[2],
                    NameType: data.NameType.split('-coalesce|string|agg-')[2] == '99' ? null : data.NameType.split('-coalesce|string|agg-')[2],
                    NameColor1: data.NameColor1.split('-coalesce|string|agg-')[2] == 'partynull' ? null : data.NameColor1.split('-coalesce|string|agg-')[2],
                    NameColor2: data.NameColor2.split('-coalesce|string|agg-')[2] == 'partynull' ? null : data.NameColor2.split('-coalesce|string|agg-')[2]
                },
                p4: {
                    PlayerID: data.PlayerID.split('-coalesce|string|agg-')[3],
                    PlayerName: data.PlayerName.split('-coalesce|string|agg-')[3],
                    CharacterName: data.CharacterName.split('-coalesce|string|agg-')[3] == 'partynull' ? null : data.CharacterName.split('-coalesce|string|agg-')[3],
                    PreferredName: data.PreferredName.split('-coalesce|string|agg-')[3],
                    RunCharacterName: data.RunCharacterName.split('-coalesce|string|agg-')[3],
                    MainClass: data.MainClass.split('-coalesce|string|agg-')[3],
                    SubClass: data.SubClass.split('-coalesce|string|agg-')[3],
                    LinkPOV: data.LinkPOV.split('-coalesce|string|agg-')[3] == 'partynull' ? null : data.LinkPOV.split('-coalesce|string|agg-')[3],
                    Server: data.Server.split('-coalesce|string|agg-')[3] == 'partynull' ? null : data.Server.split('-coalesce|string|agg-')[3],
                    Ship: data.Ship.split('-coalesce|string|agg-')[3] == '99' ? null : data.Ship.split('-coalesce|string|agg-')[3],
                    Flag: data.Flag.split('-coalesce|string|agg-')[3] == 'partynull' ? null : data.Flag.split('-coalesce|string|agg-')[3],
                    NameType: data.NameType.split('-coalesce|string|agg-')[3] == '99' ? null : data.NameType.split('-coalesce|string|agg-')[3],
                    NameColor1: data.NameColor1.split('-coalesce|string|agg-')[3] == 'partynull' ? null : data.NameColor1.split('-coalesce|string|agg-')[3],
                    NameColor2: data.NameColor2.split('-coalesce|string|agg-')[3] == 'partynull' ? null : data.NameColor2.split('-coalesce|string|agg-')[3]
                },
                s: {
                    PlayerID: data.sPlayerID,
                    PlayerName: data.sPlayerName,
                    CharacterName: data.sCharacterName,
                    PreferredName: data.sPreferredName,
                    Server: data.sServer,
                    Ship: data.sShip,
                    Flag: data.sFlag,
                    NameType: data.sNameType,
                    NameColor1: data.sNameColor1,
                    NameColor2: data.sNameColor2
                },
                shared: {
                    RunID: data.RunID,
                    Notes: data.Notes,
                    ModNotes: data.ModNotes
                }
            };
            returnArray.push(dataReturn);
        });
		//console.log(returner);
		// @ts-ignore
		// poolConnection.close();

		//returner = context.req.body;
		
        // context.res.status(200).json(returner);
        console.log(returnArray)
        return json(returnArray);
	
	}
	catch (err) {
		// @ts-ignore
		console.error(err.message);
	}
}