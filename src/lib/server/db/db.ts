import { DB_USER, DB_PASSWORD, DB_SERVER, DB_NAME } from '$env/static/private';
import type { ConnectionPool, config } from 'mssql';
import sql from 'mssql';

const dbConfig: config = {
	user: DB_USER,
	password: DB_PASSWORD,
	server: DB_SERVER,
	database: DB_NAME,
	options: {
		encrypt: true, // For Azure
		trustServerCertificate: true
	}
};

class LeaderboardDb {
	private static connectionPool: ConnectionPool;

	async connect() {
		const connectionPool = await sql.connect(dbConfig);
		LeaderboardDb.connectionPool = connectionPool;
		return connectionPool;
	}

	async disconnect() {
		return await LeaderboardDb.connectionPool.close();
	}
}

const db = new LeaderboardDb();
export const leaderboardDb = db;
