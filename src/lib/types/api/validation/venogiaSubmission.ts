import { type InferType, object, mixed, ObjectSchema } from 'yup';
import { runSubmissionRequestSchema, type RunSubmissionRequest } from './runSubmission';
import { yupRunTime } from './schemas/timeSchema';
import { yupRunPartySchema } from './schemas/runPartySchema';
import { NgsQuests } from '../runs/quests';
import { NgsRunCategories } from '../runs/categories';
import { yupQuestRank } from './schemas/questRankSchema';

const quest = [NgsQuests.Venogia];
const categories = [NgsRunCategories.UrgentQuest];
const validRanksMap: Record<string, number[]> = {
	[NgsRunCategories.UrgentQuest]: [1]
};

export const venogiaRunSubmissionSchema: ObjectSchema<RunSubmissionRequest> =
	runSubmissionRequestSchema.shape({
		details: object().strip(),
		quest: mixed<NgsQuests>().required().oneOf(quest),
		questRank: yupQuestRank(validRanksMap),
		category: mixed<NgsRunCategories>().required().oneOf(categories),
		party: yupRunPartySchema(8),
		time: yupRunTime(1800)
	});

export type VenogiaRunSubmission = InferType<typeof runSubmissionRequestSchema>;
