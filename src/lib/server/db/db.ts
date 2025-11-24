// import type { ConnectionPool, config } from 'mssql';
// import sql from 'mssql';

import * as dotenv from 'dotenv';
dotenv.config();

const serverPort =
	!process.env.DB_PORT || process.env.DB_PORT === '' ? 1433 : parseInt(process.env.DB_PORT);

// const dbConfig: config = {
// 	user: process.env.DB_USER,
// 	password: process.env.DB_PASSWORD,
// 	server: process.env.DB_SERVER ?? '',
// 	port: serverPort,
// 	database: process.env.DB_NAME,
// 	options: {
// 		encrypt: true, // For Azure
// 		trustServerCertificate: true,
// 	},
// };

class LeaderboardDb {
	// private static connectionPool: ConnectionPool;

	async connect() {
		// let pool = LeaderboardDb.connectionPool;
		// if (!pool) {
		// 	LeaderboardDb.connectionPool = await sql.connect(dbConfig);
		// 	pool = LeaderboardDb.connectionPool;
		// }
		// if (!pool.connected) {
		// 	console.warn('Connection pool was closed sometime during runtime.');
		// 	LeaderboardDb.connectionPool = await sql.connect(dbConfig);
		// }
		// return LeaderboardDb.connectionPool;
		return {} as any;
	}

	async disconnect() {
		// return await LeaderboardDb.connectionPool.close();
		return {} as any;
	}
}

const db = new LeaderboardDb();
export const leaderboardDb = db;
