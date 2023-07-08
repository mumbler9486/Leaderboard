import { guidRegex, kanjiAlphaNumericWithSpaceRegex } from '$lib/utils/validation';
import { type InferType, string, number, object, boolean } from 'yup';

const serverRegions = ['global', 'japan'];

export const createAccountSchema = object({
	userId: string().required().matches(guidRegex),
	username: string().required().min(3).max(30),
	characterName: string().required().max(25).matches(kanjiAlphaNumericWithSpaceRegex),
	serverRegion: string().required().oneOf(serverRegions)
});

export type CreateAccountRequest = InferType<typeof createAccountSchema>;
