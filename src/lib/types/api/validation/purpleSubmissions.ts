import { type InferType, string, number, object, array } from 'yup';
import { youtubeUrlRegex } from '$lib/utils/youtube';
import { parseWeapon } from '$lib/types/api/weapon';
import { PurpleRegion } from '../purpleRegions';

const regions = [PurpleRegion.Aelio, PurpleRegion.Retem, PurpleRegion.Kvaris, PurpleRegion.Stia];

export const purpleSubmissionRequestSchema = object({
	userId: string().required(),
	username: string().required(),
	region: string().required().oneOf(regions),
	serverRegion: string().required(),
	rank: number().required(),
	notes: string().max(500).nullable(),
	time: object({
		hours: number().required(),
		minutes: number().required(),
		seconds: number().required()
	}),
	players: array(
		object({
			playerId: number().nullable(),
			povVideoLink: string()
				.matches(youtubeUrlRegex, (w) => `${w.path} must a valid youtube link`)
				.nullable()
				.max(128),
			playerName: string().required(),
			inVideoName: string().required(),
			playerServer: string().nullable(),
			mainClass: string().required(),
			subClass: string().required(),
			weapons: array(
				string()
					.required()
					.test(
						'known_weapon',
						(w) => `${w.path} must be a valid weapon type`,
						(w) => !!parseWeapon(w.toLowerCase())
					)
			)
				.max(6)
				.required()
		})
	)
		.min(1)
		.max(4)
		.test('has_video', 'At least one player must have a video', (players) =>
			players?.some((p) => p.povVideoLink !== undefined)
		)
		.test(
			'player1_has_id',
			'Player 1 must be an existing user',
			(players) => players?.at(0)?.playerId !== undefined
		)
		.test('solo_requires_weapon', 'Solo requires at least 1 weapon used', (players) =>
			players?.length == 1 ? players?.at(0)?.weapons[0] !== undefined : true
		)
		.required()
});

export type PurpleSubmissionRequest = InferType<typeof purpleSubmissionRequestSchema>;
