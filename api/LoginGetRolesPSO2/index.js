const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER ?? '',
	database: process.env.DB_NAME,
	options: {
		encrypt: true,
		trustServerCertificate: true
	}
};

module.exports = async function (context, req) {
	try {
		const pool = await sql.connect(dbConfig);
		const userId = req.body.userId;

		const sqlQuery = `
        SELECT pi.Roles
        FROM dbo.Players as pi
        WHERE pi.UserId = @userGuid`;

		const results = await pool.request().input('userGuid', sql.NVarChar, userId).query(sqlQuery);
		const userRoles = results.recordset[0];

		if (!userRoles) {
			return [];
		}

		const roles = JSON.parse(userRoles.Roles);
		const response = {
			roles: roles
		};

		context.res = {
			contentType: 'application/json',
			status: 200,
			body: response
		};
	} catch (err) {
		console.error(err.message);
	}
};
