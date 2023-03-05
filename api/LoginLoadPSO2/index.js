const sql = require('mssql');

const path = require('path');

require('dotenv').config()

const config = {
	user: process.env["DB_USER"], // better stored in an app setting such as process.env.DB_USER
	password: process.env["DB_PASSWORD"], // better stored in an app setting such as process.env.DB_PASSWORD
	server: process.env["DB_SERVER"], // better stored in an app setting such as process.env.DB_SERVER
	database: process.env["DB_NAME"], // better stored in an app setting such as process.env.DB_NAME
	authentication: {
		type: 'default'
	},
	options: {
		encrypt: true
	}
}

module.exports = async function (context, req) {

	try {
		var poolConnection = await sql.connect(config);
        //console.log(req.body);
        const userID = req.body;
        //console.log(userID.userId);
        //console.log("BLEP")

		var sqlQuery = `

        SELECT
            ui.UserID,
            ui.PlayerID,

            pi.PlayerName,
            pi.CharacterName,

            pc.PreferredName,
            pc.NameType,
            pc.NameColor1,
            pc.NameColor2


        FROM Users.Information as ui
            INNER JOIN Players.Information AS pi
            ON pi.PlayerID = ui.PlayerID
            INNER JOIN Players.Customization AS pc
            ON pc.PlayerID = ui.PlayerID
        WHERE
            ui.UserID = @UserID`;
			
		var results = await poolConnection.request().input('UserID',sql.NVarChar, userID.objectId).query(sqlQuery);
		
		var returner = results.recordset;
		//console.log(results);
		poolConnection.close();

        var displayName = 'b';
        var nameType = 'b';
        var nameColor1 = 'b';
        var nameColor2 = 'b';
        //console.log(returner);

        nameType = returner[0].NameType;
        nameColor1 = returner[0].NameColor1;
        nameColor2 = returner[0].NameColor2;
        switch (returner[0].PreferredName) {
            // Player Name
            case 0:
                displayName = returner[0].PlayerName;
                break;
            // (Main) Character Name
            case 1:
                if (returner[0].CharacterName != null) {
                    displayName = returner[0].CharacterName;
                }
                else
                {
                    displayName = returner[0].PlayerName;
                }
                break;
            // In-Video Character Name
            case 2:
                if (returner[0].CharacterName != null) {
                    displayName = returner[0].CharacterName;
                }
                else
                {
                    displayName = returner[0].PlayerName;
                }
                break;
        }
    
        nameType = nameType.toString();
        //console.log(returner[0]);

        var data = {
            "version": "1.0.0",
            "action": "Continue",
            "extension_playerDisplayname": displayName, // return claim
            "extension_playerNametype" : nameType,
            "extension_playerNamecolor1" : nameColor1,
            "extension_playerNamecolor2" : nameColor2
        }

        data = JSON.stringify(data);
        data = JSON.parse(data);

        //data = JSON.stringify(data);
        //data = JSON.parse(data);
        //console.log(data);
        context.res = {
            contentType: "application/json",
                status: 200, /* Defaults to 200 */
                body: data
        };

    }
    catch (err) {
		console.error(err.message);
        var data = {
            "version": "1.0.0",
            "action": "Continue",
        }
	}

}