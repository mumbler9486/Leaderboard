export interface PlayersDbModel {
	Id: number;
	UserId: string;
	Roles: string;
	PlayerName: string;
	CharacterName: string;
	Bio: string;
	Youtube: string;
	Twitch: string;
	Discord: string;
	Twitter: string;
	Trophies: string;
	PreferredNameType: number;
	Server: string;
	Ship: number;
	Flag: string;
	NameEffectType: number;
	NameColor1: string;
	NameColor2: string;
}
