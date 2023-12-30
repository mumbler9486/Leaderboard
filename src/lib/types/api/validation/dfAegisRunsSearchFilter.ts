import { mixed, type InferType } from 'yup';
import { DfAegisSupport } from '../dfAegis/dfAegisSupports';
import { runsSearchFilterSchema } from './runsSearchFilter';

const supports = [
	null,
	DfAegisSupport.AinaManon,
	DfAegisSupport.Ilma,
	DfAegisSupport.Nadereh,
	DfAegisSupport.Glen,
	DfAegisSupport.None,
];

export const dfAegisRunsSearchFilterSchema = runsSearchFilterSchema.shape({
	support: mixed<DfAegisSupport>().nullable().oneOf(supports),
});

export type DfAegisRunsSearchFilter = InferType<typeof dfAegisRunsSearchFilterSchema>;
