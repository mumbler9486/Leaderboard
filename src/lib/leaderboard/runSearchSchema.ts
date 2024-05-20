import type { NgsRunCategories } from '$lib/types/api/runs/categories';
import type { NgsQuests } from '$lib/types/api/runs/quests';
import {
	runsSearchFilterSchema,
	type RunsSearchFilter,
} from '$lib/types/api/validation/runsSearchFilter';
import { number, object, string, type AnyObject, type ObjectSchema } from 'yup';

export const createRunSearchSchema = (
	quest: NgsQuests,
	category: NgsRunCategories,
	maxRank: number,
	maxPartySize: number
) => {
	return createDetailedRunSearchSchema(quest, category, maxRank, maxPartySize, object());
};

export const createDetailedRunSearchSchema = <T extends AnyObject>(
	quest: NgsQuests,
	category: NgsRunCategories,
	maxRank: number,
	maxPartySize: number,
	additionalFilters: ObjectSchema<T>
) => {
	const baseSchema = runsSearchFilterSchema.shape({
		quest: string().nullable().oneOf([quest]),
		category: string().nullable().oneOf([category]),
		rank: number().integer().nullable().min(1).max(maxRank),
		partySize: number().min(1).max(maxPartySize).nullable(),
	}) satisfies ObjectSchema<RunsSearchFilter>;

	return baseSchema.shape({ ...additionalFilters.fields });
};
