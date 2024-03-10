import { type InferType, string, number, object, array, ObjectSchema, mixed, boolean } from 'yup';
import { yupRunPartySchema } from './schemas/runPartySchema';
import { yupRunTime } from './schemas/timeSchema';
import { runSubmissionRequestSchema, type RunSubmissionRequest } from './runSubmission';
import { NgsQuests } from '../runs/quests';
import { NgsRunCategories } from '../runs/categories';
import { yupQuestRank } from './schemas/questRankSchema';

const categories = [
	NgsRunCategories.NexAelio,
	NgsRunCategories.RenusRetem,
	NgsRunCategories.AmsKvaris,
	NgsRunCategories.NilsStia,
	NgsRunCategories.Halvaldi,
	NgsRunCategories.Zelvin,
	NgsRunCategories.Ringwedge,
];

const quest = [NgsQuests.Duels];
const validRanksMap: Record<string, number[]> = {
	[NgsRunCategories.NexAelio]: [1],
	[NgsRunCategories.RenusRetem]: [1],
	[NgsRunCategories.AmsKvaris]: [1],
	[NgsRunCategories.NilsStia]: [1],
	[NgsRunCategories.Halvaldi]: [1],
	[NgsRunCategories.Zelvin]: [1],
	[NgsRunCategories.Ringwedge]: [1],
};

export const duelSubmissionSchema = (
	runSubmissionRequestSchema.shape({
		quest: mixed<NgsQuests>().required().oneOf(quest),
		questRank: yupQuestRank(validRanksMap),
		category: mixed<NgsRunCategories>().required().oneOf(categories),
		party: yupRunPartySchema(1),
		time: yupRunTime(600),
	}) satisfies ObjectSchema<RunSubmissionRequest>
).shape({
	details: object({
		augments: boolean().required(),
	}),
});

export type DuelRunSubmission = InferType<typeof duelSubmissionSchema>;
