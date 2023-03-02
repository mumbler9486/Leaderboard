import sql from "mssql";
import { json } from '@sveltejs/kit';

import * as dotenv from 'dotenv'
dotenv.config()

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
}

export async function PUT({ request }) {
    
    const data = await request.json();
	try {
        console.log(data);

        var CharacterName = data.newCharacterName;
        if(CharacterName == '') {
			return json( {"ERROR" : "PANIK"} )
		}       
        var NamePref = data.newPreferredName;
        var ShipSelected = data.newShip;
        if(ShipSelected == '') {
			ShipSelected = null;
		}       
        var country = data.newCountry;
        if(country == '') {
			country = null;
		}
        var color1 = data.newNameC1;
        if(color1 == '') {
			color1 = "FFFFFF";
		}
        var color2 = data.newNameC2;
        if(color2 == '') {
			color2 = "FFFFFF";
		}
        var NameColorMode = data.newNameEffect;
        var YT1Link = data.newYT1;
        if(YT1Link == '') {
			YT1Link = null;
		}
        var YT2Link = data.newYT2;
        if(YT2Link == '') {
			YT2Link = null;
		}
        var TwitchLink = data.newTwitch;
        if(TwitchLink == '') {
			TwitchLink = null;
		}
        var TwitterLink = data.newTwitter;
        if(TwitterLink == '') {
			TwitterLink = null;
		}
        var DiscordLink = data.newDiscord;
        if(DiscordLink == '') {
			DiscordLink = null;
		}
        var userDesc = data.newDescription;
        var userID = data.pidReference;

        var poolConnection = await sql.connect(config);

        var sqlGetID = `
        
        SELECT
        PlayerID
        FROM
        Users.Information
        WHERE
        UserID = @0

        `
        var results = await poolConnection.request().input('0',sql.NVarChar, userID).query(sqlGetID);

        var sqlUpdate = `
        
            UPDATE Players.Information

            SET

            CharacterName = @1,
            Youtube = @2,
            Youtube2 = @3,
            Twitch = @4,
            Twitter = @5,
            Discord = @6,
            Description = @7

            WHERE PlayerID = @0;
            
         `
    
        await poolConnection.request().input('0',sql.Int, results.recordset[0].PlayerID).input('1',sql.NVarChar,CharacterName).input('2',sql.NVarChar,YT1Link).input('3',sql.NVarChar,YT2Link).input('4',sql.NVarChar,TwitchLink).input('5',sql.NVarChar,TwitterLink).input('6',sql.NVarChar,DiscordLink).input('7',sql.NVarChar,userDesc).query(sqlUpdate);

        //console.log("PASSED");
		
		sqlUpdate = `
        
            UPDATE Players.Customization

            SET

            PreferredName = @1,
            Ship = @2,
            Flag = @3,
            NameType = @4,
            NameColor1 = @5,
            NameColor2 = @6

            WHERE PlayerID = @0;
            
         `
			
		await poolConnection.request().input('0',sql.Int, results.recordset[0].PlayerID).input('1',sql.Int, NamePref).input('2',sql.Int, ShipSelected).input('3',sql.NVarChar, country).input('4',sql.Int, NameColorMode).input('5',sql.NVarChar, color1).input('6',sql.NVarChar, color2).query(sqlUpdate);
		

		//console.log(returner);
		poolConnection.close();

		return json( { "Successful" : "Aye" } )

	
	}
	catch (err) {
		console.error(err.message);
	}
}
