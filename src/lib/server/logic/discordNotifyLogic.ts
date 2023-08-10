import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission';
import { notifyDiscordNewRunSubmitted } from '../discordNotify';

// For webhook notify
const partyTypeMap: Record<string, string> = {
	1: 'Solo',
	2: 'Duo',
	8: 'Full MPA'
};

const questTypeMap: Record<string, string> = {
	dfsolus: 'Solus'
};

const categoryTypeMap: Record<string, string> = {
	urgent_quest: 'UQ'
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
	return !partySizeName ? partyTypeMap[8] : partySizeName;
};

const getQuestName = (run: RunSubmissionRequest) => {
	const questName = questTypeMap[run.quest] ?? '<unknown_quest>';
	const categoryName = categoryTypeMap[run.category] ?? '<unknown_category>';
	return `${questName} [${categoryName}]`;
};
