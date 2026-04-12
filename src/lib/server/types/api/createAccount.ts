import { kanjiAlphaNumericWithSpaceRegex } from '$lib/utils/validation';
import { type InferType, string, object } from 'yup';

export const createAccountSchema = object({
	username: string().required().min(3).max(30).trim(),
	characterName: string()
		.required()
		.max(25)
		.matches(kanjiAlphaNumericWithSpaceRegex, 'Character name has bad characters.')
		.trim()
});

export type CreateAccountRequest = InferType<typeof createAccountSchema>;
