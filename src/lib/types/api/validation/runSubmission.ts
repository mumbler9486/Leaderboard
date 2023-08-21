import { type InferType, string, number, object, array, mixed } from 'yup';
import { ServerRegion } from '../serverRegions';
import { CurrentSubmissionPatchCode } from '$lib/constants/patchCodes';
import { yupRunTime } from './schemas/timeSchema';
import { yupRunPartySchema } from './schemas/runPartySchema';
import type { NgsQuests } from '../runs/quests';
import type { NgsRunCategories } from '../runs/categories';
import { yupQuestRank } from './schemas/questRankSchema';
import { yupGuid } from './schemas/guid';

const serverRegions = [ServerRegion.Global, ServerRegion.Japan];
const patches = [CurrentSubmissionPatchCode];

// This is only a base schema, inherit and override the fields as necessary
export const runSubmissionRequestSchema = object({
	submitterUserId: yupGuid().required(),
	submitterName: string().required(),
	quest: mixed<NgsQuests>().required(),
	category: mixed<NgsRunCategories>().required(),
	serverRegion: mixed<ServerRegion>().required().oneOf(serverRegions),
	patch: string().required().oneOf(patches),
	questRank: yupQuestRank({}),
	time: yupRunTime(),
	notes: string().max(500).nullable(),
	party: yupRunPartySchema(),
	details: mixed()
});

export type RunSubmissionRequest = InferType<typeof runSubmissionRequestSchema>;
