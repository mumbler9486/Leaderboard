import sql from "mssql";
import { json, Server } from "@sveltejs/kit";

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
export async function GET({ url }) {
  const data = await url.searchParams;
  try {
    // @ts-ignore
    var poolConnection = await sql.connect(config);

    var buffQuery = ``;
    var serverQuery = ``;

    // //console.log(data);

    if (data.get("buff") != null && data.get("buff") != "") {
      buffQuery = ` AND Buff = @BuffInput`;
    }
    if (data.get("server") != null && data.get("server") != "") {
      serverQuery = " AND RunServer = @ServerInput";
    }

    var sqlQuery =
      `

        SELECT
        COALESCE(STRING_AGG([RunCharacterName], '-coalesce|string|agg-'),'') as RunCharacterName,
        COALESCE(STRING_AGG(MainClass, '-coalesce|string|agg-'),'') as MainClass,
        COALESCE(STRING_AGG(SubClass, '-coalesce|string|agg-'),'') as SubClass,
        COALESCE(CONVERT(VARCHAR(8), MAX(time), 108),'') as Time,
        STRING_AGG(COALESCE(LinkPOV, 'partynull'), '-coalesce|string|agg-') as LinkPOV,
        MAX(Notes) as Notes,
        MAX(DFAegis.Party.RunID) as RunID,

        STRING_AGG([Players].[Information].[PlayerID], '-coalesce|string|agg-') as PlayerID,
        STRING_AGG([Players].[Information].[PlayerName], '-coalesce|string|agg-') as PlayerName,
        STRING_AGG(COALESCE([Players].[Information].[CharacterName], 'partynull'), '-coalesce|string|agg-') as CharacterName,

        STRING_AGG(PreferredName, '-coalesce|string|agg-') as PreferredName,
        STRING_AGG(COALESCE(Server, 'partynull'), '-coalesce|string|agg-') as Server,
        STRING_AGG(COALESCE(Ship, '99'), '-coalesce|string|agg-') as Ship,
        STRING_AGG(COALESCE(Flag, 'partynull'), '-coalesce|string|agg-') as Flag,
        STRING_AGG(COALESCE(NameType, '99'), '-coalesce|string|agg-') as NameType,
        STRING_AGG(COALESCE(NameColor1, 'partynull'), '-coalesce|string|agg-') as NameColor1,
        STRING_AGG(COALESCE(NameColor2, 'partynull'), '-coalesce|string|agg-') as NameColor2,

        MAX(Buff) as Buff


    FROM DFAegis.Party
    INNER JOIN
    DFAegis.PartyRunners ON DFAegis.PartyRunners.RunID = DFAegis.Party.RunID
    INNER JOIN
    Players.Information ON Players.Information.PlayerID = DFAegis.PartyRunners.PlayerID
    INNER JOIN
    Players.Customization ON Players.Customization.PlayerID = DFAegis.PartyRunners.PlayerID

    WHERE
        PartySize = 8
        AND
        [Drill] = @RegionInput
        ` +
      buffQuery +
      serverQuery +
      `
       
    GROUP BY DFAegis.Party.RunID
        
    ORDER BY MAX(time) ASC, MAX(SubmissionTime) ASC`;

    // @ts-ignore
    var results = await poolConnection
      .request()
      .input("ServerInput", sql.VarChar, data.get("server"))
      .input("buffInput", sql.VarChar, data.get("buff"))
      .input("RegionInput", sql.VarChar, data.get("trigger"))
      .input("RankInput", sql.Int, data.get("rank"))
      .query(sqlQuery);

    var returner = results.recordset;
    var returnArray = [];
    returner.forEach((data) => {
      var dataReturn = {
        p1: {
          PlayerID: data.PlayerID.split("-coalesce|string|agg-")[0],
          PlayerName: data.PlayerName.split("-coalesce|string|agg-")[0],
          CharacterName:
            data.CharacterName.split("-coalesce|string|agg-")[0] == "partynull"
              ? null
              : data.CharacterName.split("-coalesce|string|agg-")[0],
          PreferredName: data.PreferredName.split("-coalesce|string|agg-")[0],
          RunCharacterName: data.RunCharacterName.split(
            "-coalesce|string|agg-"
          )[0],
          MainClass: data.MainClass.split("-coalesce|string|agg-")[0],
          SubClass: data.SubClass.split("-coalesce|string|agg-")[0],
          LinkPOV:
            data.LinkPOV.split("-coalesce|string|agg-")[0] == "partynull"
              ? null
              : data.LinkPOV.split("-coalesce|string|agg-")[0],
          Server:
            data.Server.split("-coalesce|string|agg-")[0] == "partynull"
              ? null
              : data.Server.split("-coalesce|string|agg-")[0],
          Ship:
            data.Ship.split("-coalesce|string|agg-")[0] == "99"
              ? null
              : data.Ship.split("-coalesce|string|agg-")[0],
          Flag:
            data.Flag.split("-coalesce|string|agg-")[0] == "partynull"
              ? null
              : data.Flag.split("-coalesce|string|agg-")[0],
          NameType:
            data.NameType.split("-coalesce|string|agg-")[0] == "99"
              ? null
              : data.NameType.split("-coalesce|string|agg-")[0],
          NameColor1:
            data.NameColor1.split("-coalesce|string|agg-")[0] == "partynull"
              ? null
              : data.NameColor1.split("-coalesce|string|agg-")[0],
          NameColor2:
            data.NameColor2.split("-coalesce|string|agg-")[0] == "partynull"
              ? null
              : data.NameColor2.split("-coalesce|string|agg-")[0],
        },
        p2: {
          PlayerID: data.PlayerID.split("-coalesce|string|agg-")[1],
          PlayerName: data.PlayerName.split("-coalesce|string|agg-")[1],
          CharacterName:
            data.CharacterName.split("-coalesce|string|agg-")[1] == "partynull"
              ? null
              : data.CharacterName.split("-coalesce|string|agg-")[1],
          PreferredName: data.PreferredName.split("-coalesce|string|agg-")[1],
          RunCharacterName: data.RunCharacterName.split(
            "-coalesce|string|agg-"
          )[1],
          MainClass: data.MainClass.split("-coalesce|string|agg-")[1],
          SubClass: data.SubClass.split("-coalesce|string|agg-")[1],
          LinkPOV:
            data.LinkPOV.split("-coalesce|string|agg-")[1] == "partynull"
              ? null
              : data.LinkPOV.split("-coalesce|string|agg-")[1],
          Server:
            data.Server.split("-coalesce|string|agg-")[1] == "partynull"
              ? null
              : data.Server.split("-coalesce|string|agg-")[1],
          Ship:
            data.Ship.split("-coalesce|string|agg-")[1] == "99"
              ? null
              : data.Ship.split("-coalesce|string|agg-")[1],
          Flag:
            data.Flag.split("-coalesce|string|agg-")[1] == "partynull"
              ? null
              : data.Flag.split("-coalesce|string|agg-")[1],
          NameType:
            data.NameType.split("-coalesce|string|agg-")[1] == "99"
              ? null
              : data.NameType.split("-coalesce|string|agg-")[1],
          NameColor1:
            data.NameColor1.split("-coalesce|string|agg-")[1] == "partynull"
              ? null
              : data.NameColor1.split("-coalesce|string|agg-")[1],
          NameColor2:
            data.NameColor2.split("-coalesce|string|agg-")[1] == "partynull"
              ? null
              : data.NameColor2.split("-coalesce|string|agg-")[1],
        },
        p3: {
          PlayerID: data.PlayerID.split("-coalesce|string|agg-")[2],
          PlayerName: data.PlayerName.split("-coalesce|string|agg-")[2],
          CharacterName:
            data.CharacterName.split("-coalesce|string|agg-")[2] == "partynull"
              ? null
              : data.CharacterName.split("-coalesce|string|agg-")[2],
          PreferredName: data.PreferredName.split("-coalesce|string|agg-")[2],
          RunCharacterName: data.RunCharacterName.split(
            "-coalesce|string|agg-"
          )[2],
          MainClass: data.MainClass.split("-coalesce|string|agg-")[2],
          SubClass: data.SubClass.split("-coalesce|string|agg-")[2],
          LinkPOV:
            data.LinkPOV.split("-coalesce|string|agg-")[2] == "partynull"
              ? null
              : data.LinkPOV.split("-coalesce|string|agg-")[2],
          Server:
            data.Server.split("-coalesce|string|agg-")[2] == "partynull"
              ? null
              : data.Server.split("-coalesce|string|agg-")[2],
          Ship:
            data.Ship.split("-coalesce|string|agg-")[2] == "99"
              ? null
              : data.Ship.split("-coalesce|string|agg-")[2],
          Flag:
            data.Flag.split("-coalesce|string|agg-")[2] == "partynull"
              ? null
              : data.Flag.split("-coalesce|string|agg-")[2],
          NameType:
            data.NameType.split("-coalesce|string|agg-")[2] == "99"
              ? null
              : data.NameType.split("-coalesce|string|agg-")[2],
          NameColor1:
            data.NameColor1.split("-coalesce|string|agg-")[2] == "partynull"
              ? null
              : data.NameColor1.split("-coalesce|string|agg-")[2],
          NameColor2:
            data.NameColor2.split("-coalesce|string|agg-")[2] == "partynull"
              ? null
              : data.NameColor2.split("-coalesce|string|agg-")[2],
        },
        p4: {
          PlayerID: data.PlayerID.split("-coalesce|string|agg-")[3],
          PlayerName: data.PlayerName.split("-coalesce|string|agg-")[3],
          CharacterName:
            data.CharacterName.split("-coalesce|string|agg-")[3] == "partynull"
              ? null
              : data.CharacterName.split("-coalesce|string|agg-")[3],
          PreferredName: data.PreferredName.split("-coalesce|string|agg-")[3],
          RunCharacterName: data.RunCharacterName.split(
            "-coalesce|string|agg-"
          )[3],
          MainClass: data.MainClass.split("-coalesce|string|agg-")[3],
          SubClass: data.SubClass.split("-coalesce|string|agg-")[3],
          LinkPOV:
            data.LinkPOV.split("-coalesce|string|agg-")[3] == "partynull"
              ? null
              : data.LinkPOV.split("-coalesce|string|agg-")[3],
          Server:
            data.Server.split("-coalesce|string|agg-")[3] == "partynull"
              ? null
              : data.Server.split("-coalesce|string|agg-")[3],
          Ship:
            data.Ship.split("-coalesce|string|agg-")[3] == "99"
              ? null
              : data.Ship.split("-coalesce|string|agg-")[3],
          Flag:
            data.Flag.split("-coalesce|string|agg-")[3] == "partynull"
              ? null
              : data.Flag.split("-coalesce|string|agg-")[3],
          NameType:
            data.NameType.split("-coalesce|string|agg-")[3] == "99"
              ? null
              : data.NameType.split("-coalesce|string|agg-")[3],
          NameColor1:
            data.NameColor1.split("-coalesce|string|agg-")[3] == "partynull"
              ? null
              : data.NameColor1.split("-coalesce|string|agg-")[3],
          NameColor2:
            data.NameColor2.split("-coalesce|string|agg-")[3] == "partynull"
              ? null
              : data.NameColor2.split("-coalesce|string|agg-")[3],
        },
        p5: {
          PlayerID: data.PlayerID.split("-coalesce|string|agg-")[4],
          PlayerName: data.PlayerName.split("-coalesce|string|agg-")[4],
          CharacterName:
            data.CharacterName.split("-coalesce|string|agg-")[4] == "partynull"
              ? null
              : data.CharacterName.split("-coalesce|string|agg-")[4],
          PreferredName: data.PreferredName.split("-coalesce|string|agg-")[4],
          RunCharacterName: data.RunCharacterName.split(
            "-coalesce|string|agg-"
          )[4],
          MainClass: data.MainClass.split("-coalesce|string|agg-")[4],
          SubClass: data.SubClass.split("-coalesce|string|agg-")[4],
          LinkPOV:
            data.LinkPOV.split("-coalesce|string|agg-")[4] == "partynull"
              ? null
              : data.LinkPOV.split("-coalesce|string|agg-")[4],
          Server:
            data.Server.split("-coalesce|string|agg-")[4] == "partynull"
              ? null
              : data.Server.split("-coalesce|string|agg-")[4],
          Ship:
            data.Ship.split("-coalesce|string|agg-")[4] == "99"
              ? null
              : data.Ship.split("-coalesce|string|agg-")[4],
          Flag:
            data.Flag.split("-coalesce|string|agg-")[4] == "partynull"
              ? null
              : data.Flag.split("-coalesce|string|agg-")[4],
          NameType:
            data.NameType.split("-coalesce|string|agg-")[4] == "99"
              ? null
              : data.NameType.split("-coalesce|string|agg-")[4],
          NameColor1:
            data.NameColor1.split("-coalesce|string|agg-")[4] == "partynull"
              ? null
              : data.NameColor1.split("-coalesce|string|agg-")[4],
          NameColor2:
            data.NameColor2.split("-coalesce|string|agg-")[4] == "partynull"
              ? null
              : data.NameColor2.split("-coalesce|string|agg-")[4],
        },
        p6: {
          PlayerID: data.PlayerID.split("-coalesce|string|agg-")[5],
          PlayerName: data.PlayerName.split("-coalesce|string|agg-")[5],
          CharacterName:
            data.CharacterName.split("-coalesce|string|agg-")[5] == "partynull"
              ? null
              : data.CharacterName.split("-coalesce|string|agg-")[5],
          PreferredName: data.PreferredName.split("-coalesce|string|agg-")[5],
          RunCharacterName: data.RunCharacterName.split(
            "-coalesce|string|agg-"
          )[5],
          MainClass: data.MainClass.split("-coalesce|string|agg-")[5],
          SubClass: data.SubClass.split("-coalesce|string|agg-")[5],
          LinkPOV:
            data.LinkPOV.split("-coalesce|string|agg-")[5] == "partynull"
              ? null
              : data.LinkPOV.split("-coalesce|string|agg-")[5],
          Server:
            data.Server.split("-coalesce|string|agg-")[5] == "partynull"
              ? null
              : data.Server.split("-coalesce|string|agg-")[5],
          Ship:
            data.Ship.split("-coalesce|string|agg-")[5] == "99"
              ? null
              : data.Ship.split("-coalesce|string|agg-")[5],
          Flag:
            data.Flag.split("-coalesce|string|agg-")[5] == "partynull"
              ? null
              : data.Flag.split("-coalesce|string|agg-")[5],
          NameType:
            data.NameType.split("-coalesce|string|agg-")[5] == "99"
              ? null
              : data.NameType.split("-coalesce|string|agg-")[5],
          NameColor1:
            data.NameColor1.split("-coalesce|string|agg-")[5] == "partynull"
              ? null
              : data.NameColor1.split("-coalesce|string|agg-")[5],
          NameColor2:
            data.NameColor2.split("-coalesce|string|agg-")[5] == "partynull"
              ? null
              : data.NameColor2.split("-coalesce|string|agg-")[5],
        },
        p7: {
          PlayerID: data.PlayerID.split("-coalesce|string|agg-")[6],
          PlayerName: data.PlayerName.split("-coalesce|string|agg-")[6],
          CharacterName:
            data.CharacterName.split("-coalesce|string|agg-")[6] == "partynull"
              ? null
              : data.CharacterName.split("-coalesce|string|agg-")[6],
          PreferredName: data.PreferredName.split("-coalesce|string|agg-")[6],
          RunCharacterName: data.RunCharacterName.split(
            "-coalesce|string|agg-"
          )[6],
          MainClass: data.MainClass.split("-coalesce|string|agg-")[6],
          SubClass: data.SubClass.split("-coalesce|string|agg-")[6],
          LinkPOV:
            data.LinkPOV.split("-coalesce|string|agg-")[6] == "partynull"
              ? null
              : data.LinkPOV.split("-coalesce|string|agg-")[6],
          Server:
            data.Server.split("-coalesce|string|agg-")[6] == "partynull"
              ? null
              : data.Server.split("-coalesce|string|agg-")[6],
          Ship:
            data.Ship.split("-coalesce|string|agg-")[6] == "99"
              ? null
              : data.Ship.split("-coalesce|string|agg-")[6],
          Flag:
            data.Flag.split("-coalesce|string|agg-")[6] == "partynull"
              ? null
              : data.Flag.split("-coalesce|string|agg-")[6],
          NameType:
            data.NameType.split("-coalesce|string|agg-")[6] == "99"
              ? null
              : data.NameType.split("-coalesce|string|agg-")[6],
          NameColor1:
            data.NameColor1.split("-coalesce|string|agg-")[6] == "partynull"
              ? null
              : data.NameColor1.split("-coalesce|string|agg-")[6],
          NameColor2:
            data.NameColor2.split("-coalesce|string|agg-")[6] == "partynull"
              ? null
              : data.NameColor2.split("-coalesce|string|agg-")[6],
        },
        p8: {
          PlayerID: data.PlayerID.split("-coalesce|string|agg-")[7],
          PlayerName: data.PlayerName.split("-coalesce|string|agg-")[7],
          CharacterName:
            data.CharacterName.split("-coalesce|string|agg-")[7] == "partynull"
              ? null
              : data.CharacterName.split("-coalesce|string|agg-")[7],
          PreferredName: data.PreferredName.split("-coalesce|string|agg-")[7],
          RunCharacterName: data.RunCharacterName.split(
            "-coalesce|string|agg-"
          )[7],
          MainClass: data.MainClass.split("-coalesce|string|agg-")[7],
          SubClass: data.SubClass.split("-coalesce|string|agg-")[7],
          LinkPOV:
            data.LinkPOV.split("-coalesce|string|agg-")[7] == "partynull"
              ? null
              : data.LinkPOV.split("-coalesce|string|agg-")[7],
          Server:
            data.Server.split("-coalesce|string|agg-")[7] == "partynull"
              ? null
              : data.Server.split("-coalesce|string|agg-")[7],
          Ship:
            data.Ship.split("-coalesce|string|agg-")[7] == "99"
              ? null
              : data.Ship.split("-coalesce|string|agg-")[7],
          Flag:
            data.Flag.split("-coalesce|string|agg-")[7] == "partynull"
              ? null
              : data.Flag.split("-coalesce|string|agg-")[7],
          NameType:
            data.NameType.split("-coalesce|string|agg-")[7] == "99"
              ? null
              : data.NameType.split("-coalesce|string|agg-")[7],
          NameColor1:
            data.NameColor1.split("-coalesce|string|agg-")[7] == "partynull"
              ? null
              : data.NameColor1.split("-coalesce|string|agg-")[7],
          NameColor2:
            data.NameColor2.split("-coalesce|string|agg-")[7] == "partynull"
              ? null
              : data.NameColor2.split("-coalesce|string|agg-")[7],
        },
        shared: {
          RunID: data.RunID,
          Time: data.Time,
          Notes: data.Notes,
          Buff: data.Buff,
        },
      };
      returnArray.push(dataReturn);
    });
    // @ts-ignore
    // poolConnection.close();

    //returner = context.req.body;

    // context.res.status(200).json(returner);

    return json(returnArray);
  } catch (err) {
    // @ts-ignore
    console.error(err.message);
  }
}
