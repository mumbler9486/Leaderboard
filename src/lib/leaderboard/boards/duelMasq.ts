import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { boolean, number, object, string } from 'yup';
import { LeaderboardDefinition } from '../leaderboard';
import { Game } from '$lib/types/api/game';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { PartySize } from '$lib/types/api/partySizes';
import { createDetailedRunSearchSchema } from '../runSearchSchema';
import { createDetailedRunSubmissionSchema } from '../submissionSchema';
import type { RunAttributeFilter } from '$lib/server/types/db/runs/runAttributeFilter';

const rules = [
	'Do not abuse bugs or exploits.',
	'Runs in this category will be ranked by Depth, then by Rank, then by Time.',
];

const duelDetailsSchema = object({
	depth: number().required(),
});

export const duelMasqDepthsBoard = new LeaderboardDefinition({
	name: 'leaderboard.duels.duel_masq',
	questRoute: 'extra-duels',
	categoryRoute: 'masquerade',
	icon: '/icons/submit/duel_nils_stia.png',
	game: Game.Ngs,
	quest: NgsQuests.ExtraDuels,
	category: NgsRunCategories.Masquerade,
	maxQuestRank: 10,
	playerCap: 1,
	allowedPartySizes: [PartySize.Solo],
	maxSeconds: 15 * 60,
	rules: rules,
	discordNotifyTemplate: '{boardName} (D{masqDepth},R{questRank})',
	runSubmissionSchema: createDetailedRunSubmissionSchema(
		NgsQuests.ExtraDuels,
		NgsRunCategories.Masquerade,
		10,
		1,
		15 * 60,
		duelDetailsSchema
	),
	detailsTableHeader: {
		label: 'Quest Info',
		textAlign: 'center',
	},
	runSearch: {
		runSearchSchema: createDetailedRunSearchSchema(
			NgsQuests.ExtraDuels,
			NgsRunCategories.Masquerade,
			10,
			1,
			object({
				depth: number().nullable().min(1).max(10),
			})
		),

		filterDefaults: (f) => {
			f.quest = NgsQuests.ExtraDuels;
			f.partySize = 1;
		},
		attributeFilter: (f) => {
			return f.depth === null || f.depth === undefined
				? []
				: ([
						{
							path: 'depth',
							type: 'number',
							value: f.depth as number,
						},
					] satisfies RunAttributeFilter[]);
		},
	},
});

export const duelMasqBoards = [duelMasqDepthsBoard];
