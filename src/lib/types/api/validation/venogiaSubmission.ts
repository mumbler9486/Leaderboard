import { type InferType, string, number, object, array, mixed, ObjectSchema } from 'yup';
import { runSubmissionRequestSchema, type RunSubmissionRequest } from './runSubmission';
import { yupRunTime } from './schemas/timeSchema';

const quest = ['venogia'];
const categories = ['urgent_quest'];
const ranks = [1];

export const venogiaRunSubmissionSchema: ObjectSchema<RunSubmissionRequest> =
	runSubmissionRequestSchema.shape({
		details: object().strip(),
		quest: string().required().oneOf(quest),
		rank: number().oneOf(ranks).required(),
		category: string().required().oneOf(categories),
		time: yupRunTime(3600)
	});

export type VenogiaRunSubmission = InferType<typeof runSubmissionRequestSchema>;
