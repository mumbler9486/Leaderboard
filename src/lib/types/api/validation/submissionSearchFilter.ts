import { type InferType, mixed, object, number, string } from 'yup';
import { RunSubmissionStatus } from '../runs/submissionStatus';
import { RunSortOption } from '../runs/sortOptions';

const submissionStatuses = [
	null,
	RunSubmissionStatus.Approved,
	RunSubmissionStatus.AwaitingApproval,
	RunSubmissionStatus.Rejected,
];

const sorts = [null, RunSortOption.Recent];

export const submissionSearchFilterSchema = object({
	take: number().min(1).max(100).nullable(),
	page: number().min(0).max(30000).nullable(),
	status: number().nullable().oneOf(submissionStatuses),
	sort: string().nullable().oneOf(sorts),
	submitterId: number().min(0).nullable(),
});

export type SubmissionSearchFilter = InferType<typeof submissionSearchFilterSchema>;
