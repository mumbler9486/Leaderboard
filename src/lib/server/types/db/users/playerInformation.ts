export interface PlayerInformationDbModel {
	PlayerID: string;
	PlayerName: string;
	CharacterName: string;
	Description: string;
	Youtube: string;
	Youtube2: string;
	Twitch: string;
	Twitter: string;
	Discord: string;
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
