import { type InferType, string, number, object, array, mixed } from 'yup';
import { NgsPlayerClass } from '../../ngsPlayerClass';
import { Weapon } from '../../weapon';
import { youtubeUrlRegex } from '$lib/utils/youtube';
import { findDuplicates } from '../utils/duplicate';

const mainClasses = [
	NgsPlayerClass.Hunter,
	NgsPlayerClass.Fighter,
	NgsPlayerClass.Ranger,
	NgsPlayerClass.Gunner,
	NgsPlayerClass.Force,
	NgsPlayerClass.Techter,
	NgsPlayerClass.Braver,
	NgsPlayerClass.Bouncer,
	NgsPlayerClass.Waker,
	NgsPlayerClass.Slayer
];
const subClasses = mainClasses;

const weapons = [
	Weapon.Sword,
	Weapon.WiredLance,
	Weapon.Partisan,
	Weapon.TwinDaggers,
	Weapon.DoubleSabers,
	Weapon.Knuckles,
	Weapon.Katana,
	Weapon.SoaringBlades,
	Weapon.Gunblade,
	Weapon.AssaultRifle,
	Weapon.Launcher,
	Weapon.TwinMachineGuns,
	Weapon.Bow,
	Weapon.Rod,
	Weapon.Talis,
	Weapon.Wand,
	Weapon.JetBoots,
	Weapon.Harmonizer
];

export const yupRunPartySchema = (maxPlayers: number = 4) => {
	return array(
		object({
			playerId: number().nullable().positive().integer(),
			ordinal: number().default(0).min(0).integer().max(maxPlayers),
			povLink: string()
				.matches(youtubeUrlRegex, (w) => `${w.path} must a valid youtube link`)
				.nullable()
				.max(100),
			inVideoName: string().required().max(30),
			mainClass: mixed<NgsPlayerClass>().required().oneOf(mainClasses),
			subClass: mixed<NgsPlayerClass>().required().oneOf(subClasses),
			weapons: array(mixed<Weapon>().required().oneOf(weapons)).max(6).ensure().required()
		})
	)
		.min(1)
		.max(maxPlayers)
		.test('has_video', 'At least one player must have a video', (players) =>
			players?.some((p) => p.povLink !== undefined)
		)
		.test(
			'player1_has_id',
			'Player 1 must be an existing user',
			(players) => players?.at(0)?.playerId !== undefined
		)
		.test('solo_requires_weapon', 'Solo requires at least 1 weapon used', (players) =>
			players?.length == 1 ? players?.at(0)?.weapons[0] !== undefined : true
		)
		.test('duplicate_players', 'There are duplicate players', (players, testCtx) => {
			if (!players) {
				return true;
			}
			const nonNullPlayers = players.filter((p) => !!p.playerId);
			const duplicates = findDuplicates(nonNullPlayers, (p) => p.playerId!);
			if (duplicates.length == 0) {
				return true;
			}

			const playerNames = duplicates.map((d) => d.inVideoName).join(',');
			return testCtx.createError({
				message: `Duplicate party members (same leaderboard account) not allowed: ${playerNames}`
			});
		})
		.test(
			'duplicate_anon_players',
			'There are duplicate no account players',
			(players, testCtx) => {
				if (!players) {
					return true;
				}
				const nullPlayers = players.filter((p) => !p.playerId);
				const duplicates = findDuplicates(nullPlayers, (p) => p.inVideoName);
				if (duplicates.length == 0) {
					return true;
				}

				const playerNames = duplicates.map((d) => d.inVideoName).join(',');
				return testCtx.createError({
					message: `Duplicate party members not allowed: ${playerNames}`
				});
			}
		)
		.required();
};
