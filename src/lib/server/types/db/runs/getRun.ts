export interface GetRunDbModel {
	// Run
	RunId: string;
	RunSubmitterId: string;
	RunGame: string;
	RunQuest: string;
	RunCategory: string;
	RunServerRegion: string;
	RunPatch: string;
	RunQuestRank: string;
	RunPartySize: string;
	RunTime: string;
	RunNotes: string;
	RunSubmissionDate: string;
	RunSubmissionStatus: string;
	RunDateApproved: string;
	RunModNotes: string;
	RunAttributes: string;

	// Party
	PartyId: string;
	PartyRunId: string;
	PartyPlayerId: string;
	PartyOrdinal: string;
	PartyPovLink: string;
	PartyRunCharacterName: string;
	PartyMainClass: string;
	PartySubClass: string;
	PartyWeapons: string;

	// Players
	PlayerName: string;
	PlayerCharacterName: string;
	PlayerPreferredNameType: string;
	PlayerServer: string;
	PlayerShip: string;
	PlayerFlag: string;
	PlayerNameEffectType: string;
	PlayerNameColor1: string;
	PlayerNameColor2: string;

	// Submitter
	SubmitterName: string;
	SubmitterCharacterName: string;
	SubmitterPreferredNameType: string;
	SubmitterServer: string;
	SubmitterShip: string;
	SubmitterFlag: string;
	SubmitterNameEffectType: string;
	SubmitterNameColor1: string;
	SubmitterNameColor2: string;
}
