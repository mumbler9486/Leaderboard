import { type InferType, string, number, object, array, ObjectSchema, mixed } from 'yup';
import { yupRunPartySchema } from './schemas/runPartySchema';
import { yupRunTime } from './schemas/timeSchema';
import { runSubmissionRequestSchema, type RunSubmissionRequest } from './runSubmission';
import { DfAegisSupport } from '../dfAegis/dfAegisSupports';

const categories = ['urgent_quest', 'trigger'];

const quest = ['dfaegis'];
const validRanksMap: Record<string, number[]> = {
	urgent_quest: [1],
	trigger: [1]
};

const supports = [
	DfAegisSupport.AinaManon,
	DfAegisSupport.Ilma,
	DfAegisSupport.Nadereh,
	DfAegisSupport.Glen
];

export const dfAegisSubmissionSchema = (
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
		party: yupRunPartySchema(8),
		time: yupRunTime(1200)
	}) satisfies ObjectSchema<RunSubmissionRequest>
).shape({
	details: object({
		support: mixed<DfAegisSupport>().required().oneOf(supports)
	})
});

export type DfAegisRunSubmission = InferType<typeof dfAegisSubmissionSchema>;
