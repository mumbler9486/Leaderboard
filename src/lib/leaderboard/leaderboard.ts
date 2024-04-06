import { Game } from '$lib/types/api/game';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission';
import type { ComponentType } from 'svelte';
import { object, string, number, type InferType, mixed, type ObjectSchema, array } from 'yup';

const validGames = [Game.Ngs, Game.Pso2];
const validQuests = Object.keys(NgsQuests).map((key) => NgsQuests[key as keyof typeof NgsQuests]);
const validCategories = Object.keys(NgsRunCategories).map(
	(key) => NgsRunCategories[key as keyof typeof NgsRunCategories]
);

const leaderboardSchema = object({
	name: string().required(),
	route: string().required(),
	game: mixed<Game>().required().oneOf(validGames),
	quest: mixed<NgsQuests>().required().oneOf(validQuests),
	category: string().required().oneOf(validCategories),
	maxQuestRank: number().integer().min(1).required(),
	playerCap: number().integer().min(1).max(32).required(),
	maxMinutes: number().integer().min(1).max(1440).required(),
	rules: array(string().required()).min(0).required(),
	runDetailComponent: mixed<ComponentType>().nullable(),
	runSubmissionSchema: mixed<ObjectSchema<RunSubmissionRequest>>().nullable().required(),
});

export type LeaderboardOptions = InferType<typeof leaderboardSchema>;

export class LeaderboardDefinition {
	public readonly name;
	public readonly route;
	public readonly game;
	public readonly quest;
	public readonly category;
	public readonly maxQuestRank;
	public readonly playerCap;
	public readonly maxMinutes;
	public readonly rules;
	public readonly runDetailComponent;
	public readonly runSubmissionSchema: ObjectSchema<any>;

	constructor(options: LeaderboardOptions) {
		leaderboardSchema.validateSync(options);

		this.name = options.name;
		this.route = options.route;
		this.game = options.game;
		this.quest = options.quest;
		this.category = options.category;
		this.maxQuestRank = options.maxQuestRank;
		this.playerCap = options.playerCap;
		this.maxMinutes = options.maxMinutes;
		this.rules = options.rules;
		this.runDetailComponent = options.runDetailComponent;
		this.runSubmissionSchema = options.runSubmissionSchema;
	}
}
