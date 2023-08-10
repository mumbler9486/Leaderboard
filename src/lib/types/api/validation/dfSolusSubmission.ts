import { type InferType, string, number, object, array, mixed, ObjectSchema } from 'yup';
import { runSubmissionRequestSchema, type RunSubmissionRequest } from './runSubmission';
import { yupRunTime } from './schemas/timeSchema';
import { yupRunPartySchema } from './schemas/runRartySchema';

const quest = ['dfsolus'];
const categories = ['urgent_quest'];
const ranks = [1];

export const dfSolusRunSubmissionSchema: ObjectSchema<RunSubmissionRequest> =
	runSubmissionRequestSchema.shape({
		details: object().strip(),
		quest: string().required().oneOf(quest),
		questRank: number().oneOf(ranks).required(),
		category: string().required().oneOf(categories),
		party: yupRunPartySchema(4),
		time: yupRunTime(900)
	});

export type DfSolusRunSubmission = InferType<typeof runSubmissionRequestSchema>;
