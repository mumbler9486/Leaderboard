import { type InferType, string, number, object } from 'yup';
import { countries } from '../countries';
import { kanjiAlphaNumericWithSpaceRegex } from '$lib/utils/validation';
import { ServerRegion } from '../serverRegions';
import { PreferredName } from '../players/preferredName';
import { NameStyle } from '../players/nameStyle';

const serverRegions = [null, ServerRegion.Global, ServerRegion.Japan];
const preferredNames = [PreferredName.Player, PreferredName.Character];
const nameEffectTypes = [NameStyle.None, NameStyle.Solid, NameStyle.Gradient, NameStyle.Glow];

const selectableCountries = countries.map((c) => c.code.toLowerCase());
const colorRegex = /[a-f\d]{6}/;
const usernameAlphaOnlyRegex = /^[\w\-_]*$/;
const kanjiAlphaNumericTextRegex =
	/^[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf\w\-_ 　.,?:;'"{}\[\]!@#$%^&*\(\)+\n]*$/mu;
const discordUsernameRegex = kanjiAlphaNumericWithSpaceRegex;

export const profileUpdateRequestSchema = object({
	mainCharacterName: string()
		.required()
		.min(1)
		.max(25)
		.trim()
		.matches(kanjiAlphaNumericWithSpaceRegex),
	preferredName: number().required().default(PreferredName.Player).oneOf(preferredNames),
	youtubeHandle: string().nullable().optional().max(30).trim().matches(usernameAlphaOnlyRegex),
	twitterHandle: string().nullable().optional().max(30).trim().matches(usernameAlphaOnlyRegex),
	twitchChannel: string().nullable().optional().max(30).trim().matches(usernameAlphaOnlyRegex),
	discordUsername: string().nullable().optional().max(30).trim().matches(discordUsernameRegex),
	ship: number().min(-1).max(10).notOneOf([0]),
	playerCountry: string().optional().max(2).lowercase().oneOf(selectableCountries),
	serverRegion: string().nullable().oneOf(serverRegions),
	primaryColor: string().required().matches(colorRegex).max(6),
	secondaryColor: string().required().matches(colorRegex).max(6),
	nameEffect: number().required().default(NameStyle.None).oneOf(nameEffectTypes),
	description: string()
		.nullable()
		.optional()
		.default('')
		.max(500)
		.trim()
		.matches(kanjiAlphaNumericTextRegex)
});

export type ProfileUpdateRequest = InferType<typeof profileUpdateRequestSchema>;
