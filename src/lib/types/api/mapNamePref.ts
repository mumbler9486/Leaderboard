import type { PlayerNameDisplay } from '$lib/Components/PlayerNameBadge.svelte';
import type { Player } from './players/player';
import type { PartyMember, PlayerInfo2 } from './runs/run';

export const mapPlayerToNamePref = (
	player: Player | undefined
): PlayerNameDisplay | string | undefined => {
	if (!player) return undefined;

	return {
		playerId: player.playerId,
		flag: player.flag,
		ship: player.ship,
		serverRegion: player.server,
		playerName: player.playerName,
		characterName: player.characterName,
		runCharacterName: undefined,
		namePreference: player.preferredName,
		nameEffectType: player.nameType,
		nameColor1: player.nameColor1,
		nameColor2: player.nameColor2
	};
};

export const mapPartyMemberToNamePref = (
	partyMember: PartyMember
): PlayerNameDisplay | string | undefined => {
	if (!partyMember) return undefined;

	const isNullPlayer = !partyMember.playerId;
	if (isNullPlayer) {
		return partyMember.runCharacterName;
	}

	return {
		playerId: partyMember.playerId,
		flag: partyMember.playerInfo.flag,
		ship: partyMember.playerInfo.ship,
		serverRegion: partyMember.playerInfo.server,
		playerName: partyMember.playerInfo.name,
		runCharacterName: partyMember.runCharacterName,
		characterName: partyMember.playerInfo.characterName,
		namePreference: partyMember.playerInfo.preferredNameType,
		nameEffectType: partyMember.playerInfo.nameEffectType,
		nameColor1: partyMember.playerInfo.nameColor1,
		nameColor2: partyMember.playerInfo.nameColor2
	};
};

export const mapPlayerInfoNamePref = (player: PlayerInfo2): PlayerNameDisplay | undefined => {
	if (!player) return undefined;

	return {
		playerId: player.playerId,
		flag: player.flag,
		ship: player.ship,
		serverRegion: player.server,
		playerName: player.name,
		runCharacterName: '',
		characterName: player.characterName,
		namePreference: player.preferredNameType,
		nameEffectType: player.nameEffectType,
		nameColor1: player.nameColor1,
		nameColor2: player.nameColor2
	};
};
