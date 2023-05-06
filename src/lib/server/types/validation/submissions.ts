import { object, string, number, type InferType } from 'yup';

export const approveRequestSchema = object({
	moderatorName: string().required(),
	runId: number().required(),
	modNotes: string().nullable().max(500)
});
export type ApproveRequest = InferType<typeof approveRequestSchema>;
