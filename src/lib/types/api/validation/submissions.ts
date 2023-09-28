import { object, string, number, type InferType } from 'yup';

export const approveRequestSchema = object({
	runId: number().required(),
	modNotes: string().nullable().max(500)
});
export type ApproveRequest = InferType<typeof approveRequestSchema>;

export const denyRequestSchema = object({
	runId: number().required(),
	modNotes: string().nullable().max(500)
});

export type DenyRequest = InferType<typeof denyRequestSchema>;
