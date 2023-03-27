import sql from 'mssql';
import { json } from '@sveltejs/kit';

import * as dotenv from 'dotenv';

dotenv.config();

const config = {
	user: process.env.DB_SUBMIT_USER, // better stored in an app setting such as process.env.DB_USER
	password: process.env.DB_SUBMIT_PASSWORD, // better stored in an app setting such as process.env.DB_PASSWORD
	server: process.env.DB_SERVER, // better stored in an app setting such as process.env.DB_SERVER
	database: process.env.DB_NAME, // better stored in an app setting such as process.env.DB_NAME
	authentication: {
		type: 'default'
	},
	options: {
		encrypt: true
	}
};

export async function POST({ request }) {
	const data = await request.json();
	const urlInfo = await request.url;
	let params = new URL(urlInfo).searchParams;

	switch (params.get('type')) {
		case 'dfaduo':
			try {
				var poolConnection = await sql.connect(config);

				var sqlRemove = `
                
                    UPDATE Submissions.DFAegisParty
                    SET SubmissionStatus = 2
                    WHERE RunID = @0;
                    
                 `;

				await poolConnection.request().input('0', sql.Int, data.shared.RunID).query(sqlRemove);
				poolConnection.close();

				return json({ Code: 'success' });
			} catch (err) {
				console.error(err.message);
				return json({ Code: 'error' });
			}
			break;

		case 'dfaparty':
			try {
				var poolConnection = await sql.connect(config);

				var sqlRemove = `
                
                    UPDATE Submissions.DFAegisParty
                    SET SubmissionStatus = 2
                    WHERE RunID = @0;
                    
                 `;

				await poolConnection.request().input('0', sql.Int, data.shared.RunID).query(sqlRemove);
				poolConnection.close();

				//returner = context.req.body;

				return json({ Code: 'success' });
			} catch (err) {
				console.error(err.message);
				return json({ Code: 'error' });
			}
			break;

		case 'purpleparty':
			try {
				var poolConnection = await sql.connect(config);

				var sqlRemove = `
                    
                        UPDATE Submissions.Party
                        SET SubmissionStatus = 1
                        WHERE RunID = @0;
                        
                     `;

				await poolConnection.request().input('0', sql.Int, data.shared.RunID).query(sqlRemove);

				poolConnection.close();

				//returner = context.req.body;

				return json({ Code: 'success' });
			} catch (err) {
				console.error(err.message);
				return json({ Code: 'error' });
			}
			break;

		case 'purpleduo':
			try {
				var poolConnection = await sql.connect(config);

				var sqlRemove = `
                
                    UPDATE Submissions.Party
                    SET SubmissionStatus = 1
                    WHERE RunID = @0;
                    
                 `;

				await poolConnection.request().input('0', sql.Int, data.shared.RunID).query(sqlRemove);

				poolConnection.close();

				//returner = context.req.body;

				return json({ Code: 'success' });
			} catch (err) {
				console.error(err.message);
				return json({ Code: 'error' });
			}
			break;

		case 'dfasolo':
			try {
				//console.log("FALZ ALERT")
				var poolConnection = await sql.connect(config);

				var sqlRemove = `
                
                    UPDATE Submissions.DFAegisSolo
                    SET SubmissionStatus = 1
                    WHERE RunID = @0;
                    
                 `;

				await poolConnection.request().input('0', sql.Int, data.RunID).query(sqlRemove);

				poolConnection.close();

				//returner = context.req.body;

				return json({ Code: 'success' });
			} catch (err) {
				console.error(err.message);
				return json({ Code: 'error' });
			}
			break;

		default:
			try {
				var poolConnection = await sql.connect(config);

				var sqlRemove = `
                
                    UPDATE Submissions.Pending
                    SET SubmissionStatus = 1
                    WHERE RunID = @0;
                    
                 `;

				await poolConnection.request().input('0', sql.Int, data.RunID).query(sqlRemove);

				poolConnection.close();

				//returner = context.req.body;

				return json({ Code: 'success' });
			} catch (err) {
				console.error(err.message);
				return json({ Code: 'error' });
			}
			break;
	}
}
