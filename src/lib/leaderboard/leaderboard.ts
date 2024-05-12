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
import type { TableHeader } from '$lib/Components/Tables/Table.svelte';
import { PartySize } from '$lib/types/api/partySizes';

const validGames = [Game.Ngs, Game.Pso2];
const validQuests = listEnumValues(NgsQuests);
const validCategories = listEnumValues(NgsRunCategories);
const validPartySizes = listEnumValues(PartySize);

const defaultRules: string[] = ['Do not abuse bugs or exploits.'];

const createLeaderboardSchema = <S extends RunSubmissionRequest, R extends RunsSearchFilter>() => {
	return object({
		name: string().required(),
		route: string().lowercase().required(),
		game: mixed<Game>().required().oneOf(validGames),
		icon: string().required(),
		quest: mixed<NgsQuests>().required().oneOf(validQuests),
		category: string().required().oneOf(validCategories),
		maxQuestRank: number().integer().min(1).required(),
		playerCap: number().integer().min(1).max(32).required(),
		allowedPartySizes: array(mixed<PartySize>().oneOf(validPartySizes).required())
			.min(1)
			.required(),
		maxSeconds: number().integer().min(1).max(1440).required(),
		rules: array(string().required()).min(0).optional(),
		runSubmissionSchema: mixed<ObjectSchema<S>>().nullable().required(),
		runSearch: object({
			runSearchSchema: mixed<ObjectSchema<R>>().nullable().required(),
			filterDefaults: mixed<RunSearchValidator<R>['filterDefaults']>().required(),
			attributeFilter: mixed<RunSearchValidator<R>['attributeFilter']>().required(),
		}).required() satisfies ObjectSchema<RunSearchValidator<R>>,
		detailsTableHeader: mixed<TableHeader>().optional(),
	}) satisfies ObjectSchema<LeaderBoardOptions<S, R>>;
};

interface LeaderBoardOptions<S extends RunSubmissionRequest, R extends RunsSearchFilter> {
	name: string;
	route: string;
	icon: string;
	game: Game;
	quest: NgsQuests;
	category: string;
	maxQuestRank: number;
	playerCap: number;
	allowedPartySizes: PartySize[];
	maxSeconds: number;
	rules?: string[];
	runSubmissionSchema?: ObjectSchema<S>;
	runSearch: RunSearchValidator<R>;
	detailsTableHeader?: TableHeader;
}

interface RunSearchValidator<R extends AnyObject> {
	runSearchSchema?: ObjectSchema<R>;
	filterDefaults: (filter: R) => void;
	attributeFilter: (filter: R) => RunAttributeFilter[] | undefined;
}

export class LeaderboardDefinition<
	S extends RunSubmissionRequest = RunSubmissionRequest,
	R extends RunsSearchFilter = RunsSearchFilter,
> {
	public readonly name;
	public readonly route;
	public readonly game;
	public readonly icon;
	public readonly quest;
	public readonly category;
	public readonly maxQuestRank;
	public readonly playerCap;
	public readonly allowedPartySizes;
	public readonly maxSeconds;
	public readonly rules;
	public readonly runSubmissionSchema: ObjectSchema<S>;
	public readonly runSearchSchema;
	public readonly detailsTableHeader?: TableHeader;
	private readonly runSearchOptions: RunSearchValidator<R>;

	constructor(options: LeaderBoardOptions<S, R>) {
		const schema = createLeaderboardSchema<S, R>();
		const validatedOptions = schema.validateSync(options);

		this.name = validatedOptions.name;
		this.route = validatedOptions.route;
		this.game = validatedOptions.game;
		this.icon = validatedOptions.icon;
		this.quest = validatedOptions.quest;
		this.category = validatedOptions.category;
		this.maxQuestRank = validatedOptions.maxQuestRank;
		this.playerCap = validatedOptions.playerCap;
		this.allowedPartySizes = validatedOptions.allowedPartySizes;
		this.maxSeconds = validatedOptions.maxSeconds;
		this.rules = validatedOptions.rules ?? defaultRules;
		this.runSubmissionSchema = validatedOptions.runSubmissionSchema ?? runSubmissionRequestSchema;
		this.runSearchSchema = validatedOptions.runSearch.runSearchSchema ?? runsSearchFilterSchema;
		this.runSearchOptions = validatedOptions.runSearch;
		this.detailsTableHeader = validatedOptions.detailsTableHeader;
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
