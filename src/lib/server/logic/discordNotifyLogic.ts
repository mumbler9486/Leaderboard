import { lookupBoard } from '$lib/leaderboard/boards';
import { PartySize, partySizeTranslationMap } from '$lib/types/api/partySizes';
import { NgsRunCategories, ngsCategoryTranslationMap } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission';
import { formatString } from '$lib/utils/string';
import { unwrapFunctionStore, format } from 'svelte-i18n';
import { sendDiscordNotification, type DiscordMessage } from '../repositories/discordRepository';

const locale = 'en';
const t = unwrapFunctionStore(format);

const username = 'PSO2 Central Leaderboard';
const baseUrl = process.env.SITE_DOMAIN ?? '';

const WebhookUserThumbnailUrl = `${baseUrl}/notify/webhook_user_icon.png`;
const RunSubmittedDiscordWebhookUrl = process.env.RUN_SUBMITTED_DISCORD_WEBHOOK_URL ?? '';
const RunApprovalDiscordWebhookUrl = process.env.RUN_APPROVAL_DISCORD_WEBHOOK_URL ?? '';

export const notifyDiscordNewRun = async (submitter: string, run: RunSubmissionRequest) => {
	const submitterName = submitter;
	const questLabel = getQuestName(run.quest, run.category, run.party.length);

	const message: DiscordMessage = {
		username: username,
		title: 'A new run has been submitted :hourglass_flowing_sand:',
		url: baseUrl,
		description: `A new **${questLabel}** run has been submitted by \`${submitterName}\` to the leaderboard and awaits approval.`,
		color: 16765294,
		thumbnailUrl: WebhookUserThumbnailUrl,
		imageUrl: getThumbnailUrl(run.quest),
		footerText: username,
	};

	sendDiscordNotification(RunSubmittedDiscordWebhookUrl, message);
};

export const notifyDiscordNewRunApprovedLogic = async (
	moderatorName: string,
	runnerName: string,
	quest: NgsQuests,
	category: NgsRunCategories,
	partySize: number
) => {
	const questLabel = getQuestName(quest, category, partySize);

	const message: DiscordMessage = {
		username: username,
		title: 'A new run has been approved :white_check_mark:',
		url: baseUrl,
		description: `A new **${questLabel}** run from \`${runnerName}\` has been approved by \`${moderatorName}\` and added to the leaderboard.`,
		color: 54300,
		thumbnailUrl: WebhookUserThumbnailUrl,
		imageUrl: getThumbnailUrl(quest),
		footerText: username,
	};

	await sendDiscordNotification(RunApprovalDiscordWebhookUrl, message);
};

const getQuestName = (quest: NgsQuests, category: NgsRunCategories, partySize: number) => {
	const boardInfo = lookupBoard(quest, category);
	if (!boardInfo) {
		console.error('Invalid quest/category', quest, category);
		return `<unknown_quest> [<unknown_category>]`;
	}

	const nameTemplate = boardInfo.discordNotifyTemplate ?? '{boardName} [{category}] ({partySize})';
	const partySizeName = getPartySizeName(partySize);
	const boardName = t(boardInfo.name, { locale });
	const categoryName = t(ngsCategoryTranslationMap[category], { locale });
	return formatString(nameTemplate, {
		boardName,
		category: categoryName,
		partySize: partySizeName,
	});
};

const getPartySizeName = (size: number) => {
	if (size === 1) return t(partySizeTranslationMap[PartySize.Solo], { locale });
	if (size === 2) return t(partySizeTranslationMap[PartySize.Duo], { locale });
	if (size === 3 || size === 4) return t(partySizeTranslationMap[PartySize.Party], { locale });
	if (size >= 5) return t(partySizeTranslationMap[PartySize.MultiParty], { locale });
	return '<unknown_party_size>';
};

const thumbnailMap: Partial<Record<NgsQuests, string>> = {
	[NgsQuests.DfAegis]: `${baseUrl}/notify/df_aegis.png`,
	[NgsQuests.Duels]: `${baseUrl}/notify/df_solus.jpg`,
	[NgsQuests.Purples]: `${baseUrl}/notify/stia_purple.png`,
	[NgsQuests.DfSolus]: `${baseUrl}/notify/df_solus.jpg`,
};

const getThumbnailUrl = (quest: NgsQuests) => {
	const thumbnailUrl = thumbnailMap[quest];
	if (!thumbnailUrl) {
		return thumbnailMap[NgsQuests.Purples]!;
	} else {
		return thumbnailUrl;
	}
};
