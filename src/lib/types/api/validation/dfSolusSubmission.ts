import { type InferType, string, number, object, array, mixed, ObjectSchema } from 'yup';
import { runSubmissionRequestSchema, type RunSubmissionRequest } from './runSubmission';
import { yupRunTime, yupRunTimeMapped } from './schemas/timeSchema';
import { yupRunPartySchema } from './schemas/runPartySchema';
import { NgsQuests } from '../runs/quests';
import { NgsRunCategories } from '../runs/categories';
import { yupQuestRank } from './schemas/questRankSchema';

const quest = [NgsQuests.DfSolus];
const categories = [NgsRunCategories.Quest, NgsRunCategories.UrgentQuest];
const validRanksMap: Record<string, number[]> = {
	[NgsRunCategories.Quest]: [1],
	[NgsRunCategories.UrgentQuest]: [1],
};

const validTimeMap = {
	[NgsRunCategories.Quest]: 900,
	[NgsRunCategories.UrgentQuest]: 3600,
};

export const dfSolusRunSubmissionSchema: ObjectSchema<RunSubmissionRequest> =
	runSubmissionRequestSchema.shape({
		details: object().strip(),
		quest: mixed<NgsQuests>().required().oneOf(quest),
		questRank: yupQuestRank(validRanksMap),
		category: mixed<NgsRunCategories>().required().oneOf(categories),
		party: yupRunPartySchema(8),
		time: yupRunTimeMapped(validTimeMap),
	});

export type DfSolusRunSubmission = InferType<typeof runSubmissionRequestSchema>;
