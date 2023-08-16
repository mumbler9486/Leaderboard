import { type InferType, boolean } from 'yup';
import { runsSearchFilterSchema } from './runsSearchFilter';

const augments = [null, true, false];

export const duelRunsSearchFilterSchema = runsSearchFilterSchema.shape({
	augments: boolean().nullable().oneOf(augments)
});

export type DuelRunsSearchFilter = InferType<typeof duelRunsSearchFilterSchema>;
