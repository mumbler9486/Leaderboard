import { lookupBoard } from '$lib/leaderboard/boards';
import { NgsRunCategories, ngsCategoryTranslationMap } from '$lib/types/api/runs/categories';
import type { NgsQuests } from '$lib/types/api/runs/quests';
import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission';
import { formatString } from '$lib/utils/string';
import { notifyDiscordNewRunApproved, notifyDiscordNewRunSubmitted } from '../discordNotify';
import { unwrapFunctionStore, format } from 'svelte-i18n';

const locale = 'en';
const t = unwrapFunctionStore(format);

const partyTypeMap: Record<string, string> = {
	1: 'Solo',
	2: 'Duo',
	3: 'Party',
	4: 'Party',
	5: 'MPA',
	6: 'MPA',
	7: 'MPA',
	8: 'Full MPA',
};

export const notifyDiscordNewRun = async (submitter: string, run: RunSubmissionRequest) => {
	const submitterName = submitter;
	const questName = getQuestName(run.quest, run.category);
	const partySizeName = getPartySizeName(run.party.length);
	notifyDiscordNewRunSubmitted(submitterName, `${questName} (${partySizeName})`);
};

export const notifyDiscordNewRunApprovedLogic = async (
	moderatorName: string,
	runnerName: string,
	quest: NgsQuests,
	category: NgsRunCategories,
	partySize: number
) => {
	const questName = getQuestName(quest, category);
	const partySizeName = getPartySizeName(partySize);
	notifyDiscordNewRunApproved(
		moderatorName,
		runnerName ?? '<Player_Name>',
		`${questName} (${partySizeName})`
	);
};

const getPartySizeName = (size: number) => {
	if (size == 0) return '<unknown_party_size>';
	const partySizeName = partyTypeMap[size];
	return !partySizeName ? partyTypeMap[4] : partySizeName;
};

const getQuestName = (quest: NgsQuests, category: NgsRunCategories) => {
	const boardInfo = lookupBoard(quest, category);
	if (!boardInfo) {
		console.error('Invalid quest/category', quest, category);
		return `<unknown_quest> [<unknown_category>]`;
	}

	const nameTemplate = boardInfo.discordNotifyTemplate ?? '{boardName} [{category}]';
	const boardName = t(boardInfo.name, { locale: locale });
	const categoryName = t(ngsCategoryTranslationMap[category], { locale: locale });
	return formatString(nameTemplate, { boardName, category: categoryName });
};
