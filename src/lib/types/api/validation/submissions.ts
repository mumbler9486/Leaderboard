import { object, string, number, type InferType } from 'yup';
import { yupGuid } from './schemas/guid';

export const approveRequestSchema = object({
	moderatorUserId: yupGuid().required(),
	runId: number().required(),
	modNotes: string().nullable().max(500)
});
export type ApproveRequest = InferType<typeof approveRequestSchema>;

export const denyRequestSchema = object({
	moderatorUserId: yupGuid().required(),
	runId: number().required(),
	modNotes: string().nullable().max(500)
});

export type DenyRequest = InferType<typeof denyRequestSchema>;
