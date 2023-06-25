export interface PlayerInformationDbModel {
	PlayerID: string;
	PlayerName: string;
	CharacterName: string;
}

export interface PlayerCustomizationDbModel {
	PlayerID: string;
	NameType: string;
	NameColor1: string;
	NameColor2: string;
	Server: string;
	PreferredName: string;
	Flag: string;
	Ship: string;
}
