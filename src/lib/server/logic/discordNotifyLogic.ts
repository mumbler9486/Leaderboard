import { lookupBoard } from '$lib/leaderboard/boards';
import { PartySize, partySizeTranslationMap } from '$lib/types/api/partySizes';
import { NgsRunCategories, ngsCategoryTranslationMap } from '$lib/types/api/runs/categories';
import type { NgsQuests } from '$lib/types/api/runs/quests';
import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission';
import { formatString } from '$lib/utils/string';
import { notifyDiscordNewRunApproved, notifyDiscordNewRunSubmitted } from '../discordNotify';
import { unwrapFunctionStore, format } from 'svelte-i18n';

const locale = 'en';
const t = unwrapFunctionStore(format);

export const notifyDiscordNewRun = async (submitter: string, run: RunSubmissionRequest) => {
	const submitterName = submitter;
	const questLabel = getQuestName(run.quest, run.category, run.party.length);
	notifyDiscordNewRunSubmitted(submitterName, questLabel);
};

export const notifyDiscordNewRunApprovedLogic = async (
	moderatorName: string,
	runnerName: string,
	quest: NgsQuests,
	category: NgsRunCategories,
	partySize: number
) => {
	const questLabel = getQuestName(quest, category, partySize);
	notifyDiscordNewRunApproved(moderatorName, runnerName ?? '<Player_Name>', questLabel);
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
	if (size >= 3 && size <= 7) return t(partySizeTranslationMap[PartySize.Party], { locale });
	if (size >= 8) return t(partySizeTranslationMap[PartySize.MultiParty], { locale });
	return '<unknown_party_size>';
};
