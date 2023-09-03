import { type InferType, mixed, object, number } from 'yup';
import { RunSubmissionStatus } from '../runs/submissionStatus';

const submissionStatuses = [
	null,
	RunSubmissionStatus.Approved,
	RunSubmissionStatus.AwaitingApproval,
	RunSubmissionStatus.Rejected
];

export const submissionSearchFilterSchema = object({
	take: number().min(1).max(100).nullable(),
	page: number().min(0).max(30000).nullable(),
	status: number().nullable().oneOf(submissionStatuses)
});

export type SubmissionSearchFilter = InferType<typeof submissionSearchFilterSchema>;
