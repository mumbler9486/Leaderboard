import { type InferType, string, number, object, array, ObjectSchema, mixed } from 'yup';
import { yupRunPartySchema } from './schemas/runPartySchema';
import { yupRunTime, yupRunTimeMapped } from './schemas/timeSchema';
import { runSubmissionRequestSchema, type RunSubmissionRequest } from './runSubmission';
import { DfAegisSupport } from '../dfAegis/dfAegisSupports';
import { NgsQuests } from '../runs/quests';
import { NgsRunCategories } from '../runs/categories';
import { yupQuestRank } from './schemas/questRankSchema';

const categories = [NgsRunCategories.UrgentQuest, NgsRunCategories.Trigger, NgsRunCategories.Quest];

const quest = [NgsQuests.DfAegis];
const validRanksMap: Record<string, number[]> = {
	[NgsRunCategories.Quest]: [1],
	[NgsRunCategories.UrgentQuest]: [1],
	[NgsRunCategories.Trigger]: [1],
};

const supports = [
	DfAegisSupport.AinaManon,
	DfAegisSupport.Ilma,
	DfAegisSupport.Nadereh,
	DfAegisSupport.Glen,
	DfAegisSupport.None,
];

const validTimeMap = {
	[NgsRunCategories.Quest]: 900,
	[NgsRunCategories.Trigger]: 1200,
	[NgsRunCategories.UrgentQuest]: 1200,
};

export const dfAegisSubmissionSchema = (
	runSubmissionRequestSchema.shape({
		quest: mixed<NgsQuests>().required().oneOf(quest),
		questRank: yupQuestRank(validRanksMap),
		category: mixed<NgsRunCategories>().required().oneOf(categories),
		party: yupRunPartySchema(8),
		time: yupRunTimeMapped(validTimeMap),
	}) satisfies ObjectSchema<RunSubmissionRequest>
).shape({
	details: object({
		support: mixed<DfAegisSupport>()
			.required()
			.oneOf(supports)
			.test('valid_support', 'Support selection is invalid for this quest', (support, ctx) => {
				const category = ctx.from?.at(1)?.value?.category as NgsRunCategories | undefined;
				const isQuestCategory = category === NgsRunCategories.Quest;

				if (isQuestCategory && support === DfAegisSupport.None) {
					return true;
				} else if (!isQuestCategory && support !== DfAegisSupport.None) {
					return true;
				}
				return false;
			}),
	}),
});

export type DfAegisRunSubmission = InferType<typeof dfAegisSubmissionSchema>;
