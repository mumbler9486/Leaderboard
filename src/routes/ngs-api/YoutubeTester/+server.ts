import sql from "mssql";
import { json } from '@sveltejs/kit';

import * as dotenv from 'dotenv'
dotenv.config()

const api = new URL(process.env.PATHFIX_YOUTUBE_URL)

// @ts-ignore
// @ts-ignore
export async function GET({ url }) {
	try {
        const d = {
            "url": "https://youtube.googleapis.com/youtube/v3/channels",
            "queryString": {
                "part": "id",
                "mine": "true"
            },
            "method": "GET"
        }
        const response = await fetch(api, {
        method: 'POST',
        body: JSON.stringify(d)
        });
        var complete = await response.json()
        return json(complete);
	
	}
	catch (err) {
		// @ts-ignore
		console.error(err.message);
	}
}