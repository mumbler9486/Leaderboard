import sql from "mssql";

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

        SELECT COUNT(*) AS RunTotal FROM Purples.Solo`;

    // @ts-ignore
    var results = await poolConnection.request().query(sqlQuery);

    var returner = results.recordset[0];
    ////console.log(returner);
    // @ts-ignore
    poolConnection.close();

    //returner = context.req.body;

    // context.res.status(200).json(returner);
    return new Response(returner.RunTotal);
  } catch (err) {
    // @ts-ignore
    console.error(err.message);
  }
}
