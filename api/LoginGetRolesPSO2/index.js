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
            ui.Role,
            ui.ExtraRole

        FROM Users.Information as ui
            INNER JOIN Players.Information AS pi
            ON pi.PlayerID = ui.PlayerID
            INNER JOIN Players.Customization AS pc
            ON pc.PlayerID = ui.PlayerID
        WHERE
            ui.UserID = @UserID`;
			
		var results = await poolConnection.request().input('UserID',sql.NVarChar, userID.userId).query(sqlQuery);
		
		var returner = results.recordset;
		//console.log(results);
		poolConnection.close();

        //console.log(returner[0]);

        var exrole = returner[0].ExtraRole;
        var role = returner[0].Role;

        if (role == null) {
            role = ' ';
        }
        if (exrole == null) {
            exrole = ' ';
        }

        var data = {
          "roles": [
            role,
            exrole
          ]
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