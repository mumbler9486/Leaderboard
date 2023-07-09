import type { ConnectionPool, config } from 'mssql';
import sql from 'mssql';

import * as dotenv from 'dotenv';
dotenv.config();

const dbConfig: config = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	server: process.env.DB_SERVER,
	database: process.env.DB_NAME,
	options: {
		encrypt: true, // For Azure
		trustServerCertificate: true
	}
};

class LeaderboardDb {
	private static connectionPool: ConnectionPool;

	async connect() {
		let pool = LeaderboardDb.connectionPool;
		if (!pool) {
			LeaderboardDb.connectionPool = await sql.connect(dbConfig);
			pool = LeaderboardDb.connectionPool;
		}

		if (!pool.connected) {
			console.warn('Connection pool was closed sometime during runtime.');
			LeaderboardDb.connectionPool = await sql.connect(dbConfig);
		}

		return LeaderboardDb.connectionPool;
	}

	async disconnect() {
		return await LeaderboardDb.connectionPool.close();
	}
}

const db = new LeaderboardDb();
export const leaderboardDb = db;
