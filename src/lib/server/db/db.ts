import { drizzle, DrizzleD1Database } from 'drizzle-orm/d1';

class LeaderboardDb {
	connect(platform: App.Platform | undefined): DrizzleD1Database {
		if (!platform?.env.D1_DATABASE) {
			throw new Error('Platform not defined. Pass it during a server request.');
		}
		return drizzle(platform.env.D1_DATABASE);
	}
}

const db = new LeaderboardDb();
export const leaderboardDb = db;
