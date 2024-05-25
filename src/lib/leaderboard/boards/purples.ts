import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { LeaderboardDefinition } from '../leaderboard';
import { Game } from '$lib/types/api/game';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { PartySize } from '$lib/types/api/partySizes';
import { createRunSearchSchema } from '../runSearchSchema';
import { createRunSubmissionSchema } from '../submissionSchema';

export const purplesAelioBoard = new LeaderboardDefinition({
	name: 'leaderboard.purples.aelio',
	route: 'purples',
	icon: 'icons/submit/purple_trigger_gate.jpg',
	game: Game.Ngs,
	quest: NgsQuests.Purples,
	category: NgsRunCategories.Aelio,
	maxQuestRank: 4,
	playerCap: 4,
	allowedPartySizes: [PartySize.Solo, PartySize.Duo, PartySize.Party],
	maxSeconds: 20 * 60,
	runSubmissionSchema: createRunSubmissionSchema(
		NgsQuests.Purples,
		NgsRunCategories.Aelio,
		4,
		4,
		20 * 60
	),
	runSearch: {
		runSearchSchema: createRunSearchSchema(NgsQuests.Purples, NgsRunCategories.Aelio, 4, 4),
		filterDefaults: (f) => {
			f.quest = NgsQuests.Purples;
			f.category = f.category ?? NgsRunCategories.Aelio;
			f.partySize = f.partySize ?? 1;
		},
		attributeFilter: (f) => [],
	},
});

export const purplesRetemBoard = new LeaderboardDefinition({
	name: 'leaderboard.purples.retem',
	route: 'purples',
	icon: 'icons/submit/purple_trigger_gate.jpg',
	game: Game.Ngs,
	quest: NgsQuests.Purples,
	category: NgsRunCategories.Retem,
	maxQuestRank: 4,
	playerCap: 4,
	allowedPartySizes: [PartySize.Solo, PartySize.Duo, PartySize.Party],
	maxSeconds: 20 * 60,
	runSubmissionSchema: createRunSubmissionSchema(
		NgsQuests.Purples,
		NgsRunCategories.Retem,
		4,
		4,
		20 * 60
	),
	runSearch: {
		runSearchSchema: createRunSearchSchema(NgsQuests.Purples, NgsRunCategories.Retem, 4, 4),
		filterDefaults: (f) => {
			f.quest = NgsQuests.Purples;
			f.category = f.category ?? NgsRunCategories.Retem;
			f.partySize = f.partySize ?? 1;
		},
		attributeFilter: (f) => [],
	},
});

export const purplesKvarisBoard = new LeaderboardDefinition({
	name: 'leaderboard.purples.kvaris',
	route: 'purples',
	icon: 'icons/submit/purple_trigger_gate.jpg',
	game: Game.Ngs,
	quest: NgsQuests.Purples,
	category: NgsRunCategories.Kvaris,
	maxQuestRank: 2,
	playerCap: 4,
	allowedPartySizes: [PartySize.Solo, PartySize.Duo, PartySize.Party],
	maxSeconds: 20 * 60,
	runSubmissionSchema: createRunSubmissionSchema(
		NgsQuests.Purples,
		NgsRunCategories.Kvaris,
		2,
		4,
		20 * 60
	),
	runSearch: {
		runSearchSchema: createRunSearchSchema(NgsQuests.Purples, NgsRunCategories.Kvaris, 2, 4),
		filterDefaults: (f) => {
			f.quest = NgsQuests.Purples;
			f.category = f.category ?? NgsRunCategories.Kvaris;
			f.partySize = f.partySize ?? 1;
		},
		attributeFilter: (f) => [],
	},
});

export const purplesStiaBoard = new LeaderboardDefinition({
	name: 'leaderboard.purples.stia',
	route: 'purples',
	icon: 'icons/submit/purple_trigger_gate.jpg',
	game: Game.Ngs,
	quest: NgsQuests.Purples,
	category: NgsRunCategories.Stia,
	maxQuestRank: 1,
	playerCap: 4,
	allowedPartySizes: [PartySize.Solo, PartySize.Duo, PartySize.Party],
	maxSeconds: 20 * 60,
	runSubmissionSchema: createRunSubmissionSchema(
		NgsQuests.Purples,
		NgsRunCategories.Stia,
		1,
		4,
		20 * 60
	),
	runSearch: {
		runSearchSchema: createRunSearchSchema(NgsQuests.Purples, NgsRunCategories.Stia, 1, 4),
		filterDefaults: (f) => {
			f.quest = NgsQuests.Purples;
			f.category = f.category ?? NgsRunCategories.Stia;
			f.partySize = f.partySize ?? 1;
		},
		attributeFilter: (f) => [],
	},
});

export const purplesAelioIntrudersBoard = new LeaderboardDefinition({
	name: 'leaderboard.purples.aelioIntruders',
	route: 'purples',
	icon: 'icons/submit/purple_trigger_gate.jpg',
	game: Game.Ngs,
	quest: NgsQuests.Purples,
	category: NgsRunCategories.AelioIntruders,
	maxQuestRank: 2,
	playerCap: 4,
	allowedPartySizes: [PartySize.Solo, PartySize.Duo, PartySize.Party, PartySize.MultiParty],
	maxSeconds: 20 * 60,
	runSubmissionSchema: createRunSubmissionSchema(
		NgsQuests.Purples,
		NgsRunCategories.AelioIntruders,
		2,
		8,
		20 * 60
	),
	runSearch: {
		runSearchSchema: createRunSearchSchema(
			NgsQuests.Purples,
			NgsRunCategories.AelioIntruders,
			2,
			8
		),
		filterDefaults: (f) => {
			f.quest = NgsQuests.Purples;
			f.category = f.category ?? NgsRunCategories.AelioIntruders;
			f.partySize = f.partySize ?? 1;
		},
		attributeFilter: (f) => [],
	},
});

export const purpleBoards = [
	purplesAelioBoard,
	purplesRetemBoard,
	purplesKvarisBoard,
	purplesStiaBoard,
	purplesAelioIntrudersBoard,
];
