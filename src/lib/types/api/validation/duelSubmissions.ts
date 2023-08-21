import { type InferType, string, number, object, array, ObjectSchema, mixed, boolean } from 'yup';
import { yupRunPartySchema } from './schemas/runPartySchema';
import { yupRunTime } from './schemas/timeSchema';
import { runSubmissionRequestSchema, type RunSubmissionRequest } from './runSubmission';
import { NgsQuests } from '../runs/quests';
import { NgsRunCategories } from '../runs/categories';

const categories = [
	NgsRunCategories.NexAelio,
	NgsRunCategories.RenusRetem,
	NgsRunCategories.AmsKvaris,
	NgsRunCategories.NilsStia,
	NgsRunCategories.Halvaldi
];

const quest = [NgsQuests.Duels];
const validRanksMap: Record<string, number[]> = {
	[NgsRunCategories.NexAelio]: [1],
	[NgsRunCategories.RenusRetem]: [1],
	[NgsRunCategories.AmsKvaris]: [1],
	[NgsRunCategories.NilsStia]: [1],
	[NgsRunCategories.Halvaldi]: [1]
};

export const duelSubmissionSchema = (
	runSubmissionRequestSchema.shape({
		quest: mixed<NgsQuests>().required().oneOf(quest),
		questRank: number()
			.integer()
			.required()
			.test(
				'valid_quest_rank',
				(questRank) => `Quest rank is invalid for the selected quest.`,
				(questRank, ctx) => {
					if (!questRank) {
						return true;
					}

					const validRanks = validRanksMap[ctx.parent.category] ?? [];
					const isValid = validRanks.includes(questRank) ?? false;
					if (!isValid) {
						return ctx.createError({
							message: `Quest rank is invalid. Must be one of: ${validRanks.join(',')}`
						});
					}
					return isValid;
				}
			),
		category: mixed<NgsRunCategories>().required().oneOf(categories),
		party: yupRunPartySchema(1),
		time: yupRunTime(300)
	}) satisfies ObjectSchema<RunSubmissionRequest>
).shape({
	details: object({
		augments: boolean().required()
	})
});

export type DuelRunSubmission = InferType<typeof duelSubmissionSchema>;
