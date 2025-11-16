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

const stageDetailsSchema = object({
	stage: number().required(),
});

export const planetfallStageBossNameMappings: Record<number, string> = {
	1: 'Rasetsu',
	2: 'Max Vang',
	3: 'Raveed',
	4: 'Gil Zaver',
	5: 'Val Zagga',
	6: 'Plutineide',
};

export const planetfallStrikeBoard = new LeaderboardDefinition({
	name: 'leaderboard.duels.planetfall_strike',
	questRoute: 'extra-duels',
	categoryRoute: 'planetfall-strike',
	icon: '/icons/submit/planetfall_strike_max_vang.jpg',
	game: Game.Ngs,
	quest: NgsQuests.ExtraDuels,
	category: NgsRunCategories.PlanetfallStrike,
	maxQuestRank: 5,
	playerCap: 1,
	allowedPartySizes: [PartySize.Solo],
	maxSeconds: 10 * 60,
	discordNotifyTemplate: '{boardName} (D{planetfallStage},R{questRank})',
	runSubmissionSchema: createDetailedRunSubmissionSchema(
		NgsQuests.ExtraDuels,
		NgsRunCategories.PlanetfallStrike,
		5,
		1,
		10 * 60,
		stageDetailsSchema
	),
	detailsTableHeader: {
		label: 'Quest Info',
		textAlign: 'center',
	},
	runSearch: {
		runSearchSchema: createDetailedRunSearchSchema(
			NgsQuests.ExtraDuels,
			NgsRunCategories.PlanetfallStrike,
			5,
			1,
			object({
				stage: number().nullable().min(1).max(6),
			})
		),

		filterDefaults: (f) => {
			f.quest = NgsQuests.ExtraDuels;
			f.partySize = 1;
		},
		attributeFilter: (f) => {
			return f.stage === null ||
				f.stage === undefined ||
				!planetfallStageBossNameMappings[f.stage as number]
				? []
				: ([
						{
							path: 'stage',
							type: 'number',
							value: f.stage as number,
						},
					] satisfies RunAttributeFilter[]);
		},
	},
});

export const planetfallStrikeBoards = [planetfallStrikeBoard];
