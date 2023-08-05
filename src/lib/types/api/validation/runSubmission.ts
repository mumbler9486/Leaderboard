import { type InferType, string, number, object, array, mixed } from 'yup';
import { ServerRegion } from '../serverRegions';
import { guidRegex } from '$lib/utils/validation';
import { CurrentSubmissionPatchCode } from '$lib/constants/patchCodes';
import { yupRunTime } from './schemas/timeSchema';
import { yupRunPartySchema } from './schemas/runRartySchema';

const serverRegions = [ServerRegion.Global, ServerRegion.Japan];
const patches = [CurrentSubmissionPatchCode];

export const runSubmissionRequestSchema = object({
	submitterUserId: string().required().matches(guidRegex, 'Not a GUID'),
	submitterName: string().required(),
	quest: string().required(),
	category: string().required(),
	serverRegion: mixed<ServerRegion>().required().oneOf(serverRegions),
	patch: string().required().oneOf(patches),
	rank: number().min(1).required(),
	time: yupRunTime(),
	notes: string().max(500).nullable(),
	party: yupRunPartySchema(),
	details: mixed()
});

export type RunSubmissionRequest = InferType<typeof runSubmissionRequestSchema>;
