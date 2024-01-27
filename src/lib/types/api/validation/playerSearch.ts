import { type InferType, object, number, string } from 'yup';

export const playerSearchSchema = object({
	name: string().min(0).max(50),
	take: number().default(50).min(1).max(50),
});

export type PlayerSearchSchema = InferType<typeof playerSearchSchema>;
