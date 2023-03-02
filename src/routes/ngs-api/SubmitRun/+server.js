import sql from "mssql";
import { json } from '@sveltejs/kit';

import * as dotenv from 'dotenv'

dotenv.config()

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
}

export async function POST({ request }) {
    
    const data = await request.json();
    try {
        switch(data.runType) {
            default:
                return json({'Code' : 'error'})
        }
    }
    catch (err) {
		console.error(err.message);
        return json({'Code' : 'error'})
	}
}