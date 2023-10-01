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
	8: 'Full MPA'
};

const questTypeMap: Record<string, string> = {
	dfaegis: 'Dark Falz Aegis',
	dfsolus: 'Dark Falz Solus',
	purples: 'Purple Trigger',
	duels: 'Duel',
	venogia: 'Venogia'
};

const categoryTypeMap: Record<string, string> = {
	quest: 'Quest',
	aelio: 'Aelio',
	retem: 'Retem',
	kvaris: 'Kvaris',
	stia: 'Stia',
	urgent_quest: 'UQ',
	trigger: 'Trigger',
	nex_aelio: 'Nex Aelio',
	renus_retem: 'Renus Retem',
	ams_kvaris: 'Ams Kvaris',
	nils_stia: 'Nils Stia',
	halvaldi: 'Halvaldi'
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
	quest: string,
	category: string,
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

const getQuestName = (quest: string, category: string) => {
	const questName = questTypeMap[quest] ?? '<unknown_quest>';
	const categoryName = categoryTypeMap[category] ?? '<unknown_category>';
	return `${questName} [${categoryName}]`;
};
