import type { ConnectionPool, config } from 'mssql';
import * as sql from 'mssql';
import * as dotenv from 'dotenv';
dotenv.config();

const dbConfig: config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER ?? '',
	database: process.env.DB_NAME,
	options: {
		encrypt: true,
		trustServerCertificate: true
	}
};

class SqlDatabase {
	private static connectionPool: ConnectionPool;

	async connect() {
		let pool = SqlDatabase.connectionPool;
		if (!pool) {
			SqlDatabase.connectionPool = await sql.connect(dbConfig);
			pool = SqlDatabase.connectionPool;
		}

		if (!pool.connected) {
			console.warn('Connection pool was closed sometime during runtime.');
			SqlDatabase.connectionPool = await sql.connect(dbConfig);
		}

		return SqlDatabase.connectionPool;
	}

	async disconnect() {
		return await SqlDatabase.connectionPool.close();
	}
}

const db = new SqlDatabase();
export const sqlDb = db;
