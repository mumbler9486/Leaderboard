export interface RunDbModel {
	Id: number;
	SubmitterId: number;
	Game: string;
	Quest: string;
	Category: string;
	ServerRegion: string;
	Patch: string;
	QuestRank: number;
	PartySize: number;
	RunTime: Date;
	Notes: string;
	SubmissionDate: Date;
	SubmissionStatus: number;
	DateReviewed: Date;
	ModNotes: string;
	Attributes: string;
	ReviewedBy: string;
}
