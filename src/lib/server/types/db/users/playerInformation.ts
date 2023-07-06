export interface PlayerInformationDbModel {
	PlayerID: string;
	PlayerName: string;
	CharacterName: string;
	Description: string;
	Youtube: string;
	Twitch: string;
	Twitter: string;
	Discord: string;
	Trophies: string;
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
