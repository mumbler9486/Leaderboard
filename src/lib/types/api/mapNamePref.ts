import type { PlayerNameDisplay } from '$lib/Components/PlayerNameBadge.svelte';
import type { PlayerInfo } from '$lib/types/api/playerInfo';
import type { Player } from './players/player';
import type { PartyMember, PlayerInfo2 } from './runs/run';

/**
 * @deprecated Old name pref mapper. Use v2 instead
 */
export const mapToNamePref = (
	player: PlayerInfo | Player | undefined
): PlayerNameDisplay | undefined => {
	if (!player) return undefined;

	return {
		playerId: player.playerId,
		flag: player.flag,
		ship: player.ship,
		region: player.server,
		playerName: player.playerName,
		runCharacterName: 'runCharacterName' in player ? player.runCharacterName : '',
		characterName: player.characterName,
		namePreference: player.preferredName,
		nameType: player.nameType,
		nameColor1: player.nameColor1,
		nameColor2: player.nameColor2
	};
};

export const mapToNamePref2 = (partyMember: PartyMember): PlayerNameDisplay | undefined => {
	if (!partyMember) return undefined;

	const isNullPlayer = !partyMember.playerId;

	return {
		playerId: partyMember.playerId ?? -1,
		flag: partyMember.playerInfo.flag,
		ship: partyMember.playerInfo.ship,
		region: partyMember.playerInfo.server,
		playerName: isNullPlayer ? partyMember.runCharacterName : partyMember.playerInfo.name,
		runCharacterName: isNullPlayer ? '' : partyMember.runCharacterName,
		characterName: partyMember.playerInfo.characterName,
		namePreference: partyMember.playerInfo.preferredNameType,
		nameType: partyMember.playerInfo.nameEffectType,
		nameColor1: partyMember.playerInfo.nameColor1,
		nameColor2: partyMember.playerInfo.nameColor2
	};
};

export const mapPlayerInfoNamePref = (player: PlayerInfo2): PlayerNameDisplay | undefined => {
	if (!player) return undefined;

	return {
		playerId: player.playerId ?? -1,
		flag: player.flag,
		ship: player.ship,
		region: player.server,
		playerName: player.name,
		runCharacterName: '',
		characterName: player.characterName,
		namePreference: player.preferredNameType,
		nameType: player.nameEffectType,
		nameColor1: player.nameColor1,
		nameColor2: player.nameColor2
	};
};
