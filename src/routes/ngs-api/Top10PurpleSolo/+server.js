import sql from "mssql";
import { json } from "@sveltejs/kit";

import * as dotenv from "dotenv";
dotenv.config();

const config = {
  user: process.env.DB_USER, // better stored in an app setting such as process.env.DB_USER
  password: process.env.DB_PASSWORD, // better stored in an app setting such as process.env.DB_PASSWORD
  server: process.env.DB_SERVER, // better stored in an app setting such as process.env.DB_SERVER
  database: process.env.DB_NAME, // better stored in an app setting such as process.env.DB_NAME
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};

// @ts-ignore
// @ts-ignore
export async function GET({ request }) {
  try {
    // @ts-ignore
    var poolConnection = await sql.connect(config);

    var sqlQuery = `

        SELECT TOP 10
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
            Rank,
            Region,

            RunID,
            [RunCharacterName],
            ShipOverride,
            MainClass,
            SubClass,
            CONCAT_WS(' ', WeaponInfo1, WeaponInfo2, WeaponInfo3, WeaponInfo4, WeaponInfo5, WeaponInfo6) as WeaponInfo,
            CONVERT(VARCHAR(5), time, 108) as Time,
            Link,
            Notes


        FROM Purples.Solo, Players.Information
            INNER JOIN
            Players.Customization ON Players.Customization.PlayerID = [Players].[Information].[PlayerID]

        WHERE
            Players.Information.PlayerID = Purples.Solo.PlayerID
            
        ORDER BY SubmissionTime DESC`;

    // @ts-ignore
    var results = await poolConnection.request().query(sqlQuery);

    var returner = results.recordset;
    ////console.log(returner);
    // @ts-ignore
    poolConnection.close();

    //returner = context.req.body;

    // context.res.status(200).json(returner);
    return json(returner);
  } catch (err) {
    // @ts-ignore
    console.error(err.message);
  }
}
