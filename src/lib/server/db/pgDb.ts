import { Pool, type PoolConfig } from 'pg';

import * as dotenv from 'dotenv';
dotenv.config();

const dbConfig: PoolConfig = {
	host: process.env.PSQL_SERVER,
	port: parseInt(process.env.PSQL_PORT ?? '-1'),
	database: process.env.PSQL_DB,
	user: process.env.PSQL_USER,
	password: process.env.PSQL_PASSWORD,
};

class LeaderboardDb {
	private static pool: Pool;

	async connect() {
		let pool = LeaderboardDb.pool;
		if (!pool) {
			LeaderboardDb.pool = new Pool(dbConfig);
			pool = LeaderboardDb.pool;
			await pool.connect();
		}

		return LeaderboardDb.pool;
	}

	async disconnect() {
		return LeaderboardDb.pool.end();
	}
}

const db = new LeaderboardDb();
export const leaderboardDb = db;
