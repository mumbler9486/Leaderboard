import type { IndomitableRun } from '$lib/types/api/duels/indomitable';
import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { Weapon } from '$lib/types/api/weapon';
import { leaderboardDb } from '$lib/server/db/db';
import { json } from '@sveltejs/kit';

export async function GET({ params, url }) {
	const quest = params.quest;
	const mainClass = url.searchParams.get('class');
	const server = url.searchParams.get('server');

	console.log(params, url.searchParams);
	const db = await leaderboardDb.connect();

	return json([
		{
			rank: 1,
			server: 'Global',
			playerName: 'Intensity',
			mainClass: NgsPlayerClass.Hunter,
			subClass: NgsPlayerClass.Force,
			weapons: [Weapon.Sword, Weapon.Partisan],
			time: {
				hours: 0,
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
			mainClass: NgsPlayerClass.Bouncer,
			subClass: NgsPlayerClass.Fighter,
			weapons: [Weapon.JetBoots],
			time: {
				hours: 0,
				minutes: 10,
				seconds: 34
			},
			videoUrl: 'https://youtu.be/dQw4w9WgXcQ',
			notes: 'I am the best'
		}
	] as IndomitableRun[]);
}
