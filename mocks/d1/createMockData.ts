import { Faker, base, en, ja, mergeLocales, generateMersenne53Randomizer } from '@faker-js/faker';
import { RandomUtil } from './util/random';
import { PlayersDbModel } from '../../src/lib/server/db/types/players';
import { RunDbModel } from '../../src/lib/server/db/types/run';
import { RunPartyDbModel } from '../../src/lib/server/db/types/runParty';

export const createLeaderboardMockData = () => {
	const randomizer = generateMersenne53Randomizer();
	const faker = new Faker({
		locale: mergeLocales([en, ja, base]),
		randomizer: randomizer,
		seed: 4206967
	});
	const randomUtil = new RandomUtil(faker, randomizer);

	// Options
	const PlayerCount = 1000;
	const ModeratorCount = 10;
	const RunCount = 20_000;

	const state = {
		users: [] as PlayersDbModel[],
		moderators: [] as PlayersDbModel[], //They are also Users
		runs: [] as RunDbModel[],
		runParty: [] as RunPartyDbModel[]
	};

	// Phase 1: Create Player (users) data
	const generateUser = (index: number, isModerator = false): PlayersDbModel => {
		return {
			Id: index,
			UserId: faker.internet.username(),
			Roles: isModerator ? 'moderator' : 'player',
			PlayerName: faker.internet.username(),
			CharacterName: faker.internet.username(),
			Bio: faker.person.bio(),
			Youtube: randomUtil.randomYoutubeUrl(),
			Twitch: faker.image.url(),
			Discord: faker.image.url(),
			Twitter: faker.image.url(),
			Trophies: faker.company.buzzNoun(),
			PreferredNameType: 1,
			Server: faker.internet.displayName(),
			Ship: 2,
			Flag: faker.location.countryCode(),
			NameEffectType: 1,
			NameColor1: faker.color.rgb(),
			NameColor2: faker.color.rgb()
		};
	};

	for (let i = 0; i < PlayerCount; i++) {
		state.users.push(generateUser(i));
	}

	// 5 moderators
	for (let i = PlayerCount; i < PlayerCount + ModeratorCount; i++) {
		state.moderators.push(generateUser(i, true));
	}

	// Phase 2: Create Run data
	const generateRun = (index: number) => {
		const run: RunDbModel = {
			Id: index,
			SubmitterId: randomUtil.randomFromList(state.users).Id,
			Game: faker.lorem.word(),
			Quest: faker.lorem.word(),
			Category: faker.lorem.word(),
			ServerRegion: faker.location.countryCode(),
			Patch: faker.location.countryCode(),
			QuestRank: randomUtil.randomInt(0, 5),
			PartySize: randomUtil.randomInt(1, 5),
			RunTime: faker.date.past(),
			Notes: faker.lorem.sentence(),
			SubmissionDate: faker.date.past(),
			SubmissionStatus: randomUtil.randomInt(0, 2),
			DateReviewed: faker.date.past(),
			ModNotes: faker.lorem.sentence(),
			Attributes: faker.lorem.word(),
			ReviewedBy: randomUtil.randomFromList(state.moderators).UserId
		};

		const playersInRun = randomUtil.randomInt(1, 5);
		const runParty = [];
		for (let i = 0; i < playersInRun; i++) {
			const partyMember: RunPartyDbModel = {
				Id: index,
				RunId: index,
				PlayerId: randomUtil.randomInt(0, PlayerCount - 1),
				Ordinal: i + 1,
				PovLink: faker.image.url(),
				RunCharacterName: faker.internet.username(),
				MainClass: faker.lorem.word(),
				SubClass: faker.lorem.word(),
				StyleClass: faker.lorem.word(),
				Weapons: faker.lorem.word()
			};

			runParty.push(partyMember);
		}

		return {
			run: run,
			runParty: runParty
		};
	};

	for (let i = 0; i < RunCount; i++) {
		const { run, runParty } = generateRun(i);

		state.runs.push(run);
		state.runParty.push(...runParty);
	}

	return state;
};
