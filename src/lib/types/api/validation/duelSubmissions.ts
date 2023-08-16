import { type InferType, string, number, object, array, ObjectSchema, mixed, boolean } from 'yup';
import { yupRunPartySchema } from './schemas/runPartySchema';
import { yupRunTime } from './schemas/timeSchema';
import { runSubmissionRequestSchema, type RunSubmissionRequest } from './runSubmission';
import { IndomitableBoss } from '../duels/indomitableBoss';

const categories: string[] = [
	IndomitableBoss.NexAelio,
	IndomitableBoss.RenusRetem,
	IndomitableBoss.AmsKvaris,
	IndomitableBoss.NilsStia,
	IndomitableBoss.Halvaldi
];

const quest = ['duels'];
const validRanksMap: Record<string, number[]> = {
	[IndomitableBoss.NexAelio]: [1],
	[IndomitableBoss.RenusRetem]: [1],
	[IndomitableBoss.AmsKvaris]: [1],
	[IndomitableBoss.NilsStia]: [1],
	[IndomitableBoss.Halvaldi]: [1]
};

export const duelSubmissionSchema = (
	runSubmissionRequestSchema.shape({
		quest: string().required().oneOf(quest),
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
		category: string().required().oneOf(categories),
		party: yupRunPartySchema(1),
		time: yupRunTime(600)
	}) satisfies ObjectSchema<RunSubmissionRequest>
).shape({
	details: object({
		augments: boolean().required()
	})
});

export type DuelRunSubmission = InferType<typeof duelSubmissionSchema>;
