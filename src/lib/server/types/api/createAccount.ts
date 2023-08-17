import { guidRegex, kanjiAlphaNumericWithSpaceRegex } from '$lib/utils/validation';
import { type InferType, string, object } from 'yup';

export const createAccountSchema = object({
	userId: string().required().matches(guidRegex),
	username: string().required().min(3).max(30).trim(),
	characterName: string().required().max(25).matches(kanjiAlphaNumericWithSpaceRegex).trim()
});

export type CreateAccountRequest = InferType<typeof createAccountSchema>;
