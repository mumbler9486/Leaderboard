import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';
import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission';
import { notifyDiscordNewRunApproved, notifyDiscordNewRunSubmitted } from '../discordNotify';

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

const questTypeMap: Record<string, string> = {
	[NgsQuests.DfDalion]: 'Dark Falz Dalion',
	[NgsQuests.DfAegis]: 'Dark Falz Aegis',
	[NgsQuests.DfSolus]: 'Dark Falz Solus',
	[NgsQuests.Purples]: 'Purple Trigger',
	[NgsQuests.Duels]: 'Duel',
	[NgsQuests.Venogia]: 'Venogia',
};

const categoryTypeMap: Record<string, string> = {
	[NgsRunCategories.Quest]: 'Quest',
	[NgsRunCategories.Aelio]: 'Aelio',
	[NgsRunCategories.Retem]: 'Retem',
	[NgsRunCategories.Kvaris]: 'Kvaris',
	[NgsRunCategories.Stia]: 'Stia',
	[NgsRunCategories.UrgentQuest]: 'UQ',
	[NgsRunCategories.Trigger]: 'Trigger',
	[NgsRunCategories.NexAelio]: 'Nex Aelio',
	[NgsRunCategories.RenusRetem]: 'Renus Retem',
	[NgsRunCategories.AmsKvaris]: 'Ams Kvaris',
	[NgsRunCategories.NilsStia]: 'Nils Stia',
	[NgsRunCategories.Halvaldi]: 'Halvaldi',
	[NgsRunCategories.Zelvin]: 'Zelvin',
	[NgsRunCategories.Ringwedge]: 'Ringwedge',
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
	const questName = questTypeMap[quest] ?? '<unknown_quest>';
	const categoryName = categoryTypeMap[category] ?? '<unknown_category>';
	return `${questName} [${categoryName}]`;
};
