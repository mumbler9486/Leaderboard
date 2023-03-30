import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';

export async function GET({ url }) {
	console.log(url);
	const db = await leaderboardDb.connect();

	return json([
		{
			rank: 1,
			server: 'Global',
			playerName: 'Intensity',
			mainClass: 'Hunter',
			subClass: 'Force',
			weapons: ['Sword', 'Partisan'],
			time: {
				hour: 0,
				minutes: 9,
				seconds: 45
			},
			videoUrl: 'https://youtu.be/dQw4w9WgXcQ',
			notes: ''
		},
		{
			rank: 2,
			server: 'Global',
			playerName: 'Bobble Jack',
			mainClass: 'Bouncer',
			subClass: 'Fighter',
			weapons: ['Jet Boots'],
			time: {
				hour: 0,
				minutes: 10,
				seconds: 34
			},
			video: 'https://youtu.be/dQw4w9WgXcQ',
			notes: 'I am the best'
		}
	]);
}
