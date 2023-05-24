import { type InferType, string, number, object, array } from 'yup';
import { youtubeUrlRegex } from '$lib/utils/youtube';
import { parseWeapon } from '$lib/types/api/weapon';

const questTypes = ['trigger', 'urgent'];

export const dfaSubmissionRequestSchema = object({
	userId: string().required(),
	username: string().required(),
	type: string().required().oneOf(questTypes),
	serverRegion: string().required(),
	support: string().required(),
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
					.test((w) => !!parseWeapon(w.toLowerCase()))
			)
				.max(6)
				.required()
		})
	)
		.required()
		.test('allowed_party_size', 'Party sizes can only be 1, 2, or 8', (players) => {
			const allowedSizes = [1, 2, 8];
			return allowedSizes.findIndex((x) => players.length === x) >= 0;
		})
		.test('has_video', 'At least one player must have a video', (players) =>
			players.some((p) => p.inVideoName !== undefined)
		)
		.test(
			'player1_has_id',
			'Player 1 must be an existing user',
			(players) => players.at(0)?.playerId !== undefined
		)
		.test('solo_requires_weapon', 'Solo requires weapon definition', (players) =>
			players.length === 1 ? players.at(0)?.weapons[0] !== undefined : true
		)
});

export type DfaSubmissionRequest = InferType<typeof dfaSubmissionRequestSchema>;