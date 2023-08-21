import { type InferType, string, number, object, array, mixed, ObjectSchema } from 'yup';
import { runSubmissionRequestSchema, type RunSubmissionRequest } from './runSubmission';
import { yupRunTime } from './schemas/timeSchema';
import { yupRunPartySchema } from './schemas/runPartySchema';
import { NgsQuests } from '../runs/quests';
import { NgsRunCategories } from '../runs/categories';
import { yupQuestRank } from './schemas/questRankSchema';

const quest = [NgsQuests.DfSolus];
const categories = [NgsRunCategories.Quest];
const validRanksMap: Record<string, number[]> = {
	[NgsRunCategories.Quest]: [1]
};

export const dfSolusRunSubmissionSchema: ObjectSchema<RunSubmissionRequest> =
	runSubmissionRequestSchema.shape({
		details: object().strip(),
		quest: mixed<NgsQuests>().required().oneOf(quest),
		questRank: yupQuestRank(validRanksMap),
		category: mixed<NgsRunCategories>().required().oneOf(categories),
		party: yupRunPartySchema(4),
		time: yupRunTime(900)
	});

export type DfSolusRunSubmission = InferType<typeof runSubmissionRequestSchema>;
