import { type InferType, string, number, object } from 'yup';
import { countries } from '../countries';

const serverRegions = ['global', 'japan'];
const selectableCountries = countries.map((c) => c.code.toLowerCase());
const colorRegex = /[a-f\d]{6}/;

export const profileUpdateRequestSchema = object({
	mainCharacterName: string().required().max(24),
	preferredName: number().required().default(0),
	youtubeHandle1: string().nullable().optional(),
	youtubeHandle2: string().nullable().optional(),
	twitterHandle: string().nullable().optional(),
	twitchChannel: string().nullable().optional(),
	discordUsername: string().nullable().optional(),
	ship: number().min(-1).max(10).notOneOf([0]),
	playerCountry: string().required().max(2).lowercase().oneOf(selectableCountries),
	serverRegion: string().required().oneOf(serverRegions),
	primaryColor: string().required().matches(colorRegex).max(6),
	secondaryColor: string().required().matches(colorRegex).max(6),
	nameEffect: number().required().min(0).max(3),
	description: string().nullable().optional().default('').max(500)
});

export type ProfileUpdateRequest = InferType<typeof profileUpdateRequestSchema>;
