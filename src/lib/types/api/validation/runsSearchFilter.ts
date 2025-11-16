import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { type InferType, string, number, object } from 'yup';
import { NgsRunCategories } from '../runs/categories';
import { NgsQuests } from '../runs/quests';
import { ServerRegion } from '../serverRegions';
import { RunSortOption } from '../runs/sortOptions';
import { listEnumValues, stringEnumValuesToList } from '$lib/utils/enum';

const classes = [
	null,
	NgsPlayerClass.Hunter,
	NgsPlayerClass.Fighter,
	NgsPlayerClass.Ranger,
	NgsPlayerClass.Gunner,
	NgsPlayerClass.Force,
	NgsPlayerClass.Techter,
	NgsPlayerClass.Braver,
	NgsPlayerClass.Bouncer,
	NgsPlayerClass.Waker,
	NgsPlayerClass.Slayer,
];

const servers = [null, ServerRegion.Global, ServerRegion.Japan];
const validCategories = [null, ...listEnumValues(NgsRunCategories)];
const validQuests = [null, ...listEnumValues(NgsQuests)];
const sortOrders: (string | null)[] = [null, RunSortOption.Ranking, RunSortOption.Recent];

export const runsSearchFilterSchema = object({
	quest: string().nullable().oneOf(validQuests),
	category: string().nullable().oneOf(validCategories),
	server: string().lowercase().nullable().oneOf(servers),
	class: string()
		.lowercase()
		.nullable()
		.oneOf(classes)
		.test(
			'must_be_solo_search',
			`Main Class filter not supported on non-solo runs. Specify partySize=${1} to use this parameter.`,
			(mainClass, ctx) => {
				if (mainClass === null || mainClass === undefined) {
					return true;
				}

				if (ctx.parent.partySize !== 1 && ctx.parent.partySize !== '1') {
					return false;
				}
				return true;
			}
		),
	rank: number().integer().nullable().min(0).max(30),
	page: number().min(0).max(30000).default(0).nullable(),
	take: number().min(1).max(1000).nullable(),
	sort: string().lowercase().nullable().default(RunSortOption.Ranking).oneOf(sortOrders),
	partySize: number().min(1).max(24).nullable(),
	userId: number().min(1).nullable(),
	stage: number().min(1).max(6).nullable(),
});

export type RunsSearchFilter = InferType<typeof runsSearchFilterSchema>;
