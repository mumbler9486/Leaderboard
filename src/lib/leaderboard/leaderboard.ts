import { Game } from '$lib/types/api/game';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import {
	runSubmissionRequestSchema,
	type RunSubmissionRequest,
} from '$lib/types/api/validation/runSubmission';
import { listEnumValues } from '$lib/utils/enum';
import { object, string, number, mixed, type ObjectSchema, array, type AnyObject } from 'yup';
import type { RunAttributeFilter } from '$lib/server/types/db/runs/runAttributeFilter';
import {
	runsSearchFilterSchema,
	type RunsSearchFilter,
} from '$lib/types/api/validation/runsSearchFilter';

const validGames = [Game.Ngs, Game.Pso2];
const validQuests = listEnumValues(NgsQuests);
const validCategories = listEnumValues(NgsRunCategories);

const defaultRules: string[] = ['Do not abuse bugs or exploits.'];

const createLeaderboardSchema = <S extends RunSubmissionRequest, R extends RunsSearchFilter>() => {
	return object({
		name: string().required(),
		route: string().lowercase().required(),
		game: mixed<Game>().required().oneOf(validGames),
		quest: mixed<NgsQuests>().required().oneOf(validQuests),
		category: string().required().oneOf(validCategories),
		maxQuestRank: number().integer().min(1).required(),
		playerCap: number().integer().min(1).max(32).required(),
		maxSeconds: number().integer().min(1).max(1440).required(),
		rules: array(string().required()).min(0).optional(),
		runSubmissionSchema: mixed<ObjectSchema<S>>().nullable().required(),
		runSearch: object({
			runSearchSchema: mixed<ObjectSchema<R>>().nullable().required(),
			filterDefaults: mixed<RunSearchValidator<R>['filterDefaults']>().required(),
			attributeFilter: mixed<RunSearchValidator<R>['attributeFilter']>().required(),
		}).required() satisfies ObjectSchema<RunSearchValidator<R>>,
	}) satisfies ObjectSchema<LeaderBoardOptions<S, R>>;
};

interface LeaderBoardOptions<S extends RunSubmissionRequest, R extends RunsSearchFilter> {
	name: string;
	route: string;
	game: Game;
	quest: NgsQuests;
	category: string;
	maxQuestRank: number;
	playerCap: number;
	maxSeconds: number;
	rules?: string[];
	runSubmissionSchema?: ObjectSchema<S>;
	runSearch: RunSearchValidator<R>;
}

interface RunSearchValidator<R extends AnyObject> {
	runSearchSchema?: ObjectSchema<R>;
	filterDefaults: (filter: R) => void;
	attributeFilter: (filter: R) => RunAttributeFilter[];
}

export class LeaderboardDefinition<
	S extends RunSubmissionRequest = RunSubmissionRequest,
	R extends RunsSearchFilter = RunsSearchFilter,
> {
	public readonly name;
	public readonly route;
	public readonly game;
	public readonly quest;
	public readonly category;
	public readonly maxQuestRank;
	public readonly playerCap;
	public readonly maxSeconds;
	public readonly rules;
	public readonly runSubmissionSchema: ObjectSchema<S>;
	public readonly runSearchSchema;
	private readonly runSearchOptions: RunSearchValidator<R>;

	constructor(options: LeaderBoardOptions<S, R>) {
		const schema = createLeaderboardSchema<S, R>();
		const validatedOptions = schema.validateSync(options);

		this.name = validatedOptions.name;
		this.route = validatedOptions.route;
		this.game = validatedOptions.game;
		this.quest = validatedOptions.quest;
		this.category = validatedOptions.category;
		this.maxQuestRank = validatedOptions.maxQuestRank;
		this.playerCap = validatedOptions.playerCap;
		this.maxSeconds = validatedOptions.maxSeconds;
		this.rules = validatedOptions.rules ?? defaultRules;
		this.runSubmissionSchema = validatedOptions.runSubmissionSchema ?? runSubmissionRequestSchema;
		this.runSearchSchema = validatedOptions.runSearch.runSearchSchema ?? runsSearchFilterSchema;
		this.runSearchOptions = validatedOptions.runSearch;
	}

	/**
	 * Takes a filter and assigns default values to the filter.
	 * Use this to assign defaults for null values or force a value.
	 * Filter object will be modified in this function
	 * @param filter The filter that was parsed in the url query
	 */
	public assignRunSearchDefaults(filter: R) {
		this.runSearchOptions.filterDefaults(filter);
	}

	public createAttributeFilter(filter: R) {
		return this.runSearchOptions.attributeFilter?.(filter) ?? undefined;
	}
}