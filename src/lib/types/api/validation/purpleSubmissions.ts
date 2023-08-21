import { type InferType, string, number, object, array, ObjectSchema, mixed } from 'yup';
import { PurpleRegion } from '../purpleRegions';
import { yupRunPartySchema } from './schemas/runPartySchema';
import { yupRunTime } from './schemas/timeSchema';
import { runSubmissionRequestSchema, type RunSubmissionRequest } from './runSubmission';
import { NgsQuests } from '../runs/quests';
import { NgsRunCategories } from '../runs/categories';

const regions = [
	NgsRunCategories.Aelio,
	NgsRunCategories.Retem,
	NgsRunCategories.Kvaris,
	NgsRunCategories.Stia
];

const quest = [NgsQuests.Purples];
const validRanksMap: Record<string, number[]> = {
	[PurpleRegion.Aelio]: [1, 2, 3],
	[PurpleRegion.Retem]: [1, 2, 3],
	[PurpleRegion.Kvaris]: [1, 2],
	[PurpleRegion.Stia]: [1]
};

export const purpleSubmissionSchema: ObjectSchema<RunSubmissionRequest> =
	runSubmissionRequestSchema.shape({
		details: object().strip(),
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
		category: mixed<NgsRunCategories>().required().oneOf(regions),
		party: yupRunPartySchema(4),
		time: yupRunTime(1200)
	});

export type PurpleRunSubmission = InferType<typeof purpleSubmissionSchema>;
