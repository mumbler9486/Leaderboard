import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission';
import { notifyDiscordNewRunSubmitted } from '../discordNotify';

// For webhook notify
const partyTypeMap: Record<string, string> = {
	1: 'Solo',
	2: 'Duo',
	4: 'Party'
};

const questTypeMap: Record<string, string> = {
	dfsolus: 'Dark Falz Solus'
};

const categoryTypeMap: Record<string, string> = {
	quest: 'Quest'
};

export const notifyDiscordNewRun = async (submitter: string, run: RunSubmissionRequest) => {
	const submitterName = submitter;
	const questName = getQuestName(run);
	const partySize = getPartySizeName(run.party.length);
	notifyDiscordNewRunSubmitted(submitterName, `${questName} (${partySize})`);
};

const getPartySizeName = (size: number) => {
	if (size == 0) return '<unknown_party_size>';
	const partySizeName = partyTypeMap[size];
	return !partySizeName ? partyTypeMap[4] : partySizeName;
};

const getQuestName = (run: RunSubmissionRequest) => {
	const questName = questTypeMap[run.quest] ?? '<unknown_quest>';
	const categoryName = categoryTypeMap[run.category] ?? '<unknown_category>';
	return `${questName} [${categoryName}]`;
};
