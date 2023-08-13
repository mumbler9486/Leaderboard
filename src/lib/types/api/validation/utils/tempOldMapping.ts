import { NgsPlayerClass } from '../../ngsPlayerClass';
import type { PlayerInfo } from '../../playerInfo';
import type { DfSolusRun, PartyMember, Run } from '../../runs/run';

export const tempMapPartyPlayer = (partyMember: PartyMember): PlayerInfo | undefined => {
	if (!partyMember) {
		return undefined;
	}

	return {
		playerId: partyMember.playerId ?? 0,
		playerName: partyMember.playerName,
		ship: partyMember.playerInfo.ship,
		flag: partyMember.playerInfo.flag ?? '',
		characterName: partyMember.playerInfo.characterName,
		preferredName: partyMember.playerInfo.preferredNameType,
		runCharacterName: partyMember.runCharacterName,
		mainClass: partyMember.mainClass,
		subClass: partyMember.subClass,
		linkPov: partyMember.linkPov,
		server: '',
		nameType: partyMember.playerInfo.nameEffectType,
		nameColor1: partyMember.playerInfo.nameColor1,
		nameColor2: partyMember.playerInfo.nameColor2,
		weapons: partyMember.weapons
	} satisfies PlayerInfo;
};

export const tempMapSubmissions = (runs: Run[]) => {
	return runs.map((r) => {
		if (!r) {
			console.warn('Temp mapping Submission: null run submission was encountered. Skipped.');
			return;
		}

		return {
			//TODO : Temporary mapping, remove when runs refactored
			...r,
			submissionTime: r.submissionDate,
			partySize: r.party.length,
			server: r.serverRegion,
			notes: r.notes ?? '',
			submitter: {
				playerId: r.submitter.playerId,
				playerName: r.submitter.name,
				ship: r.submitter.ship,
				flag: r.submitter.flag ?? '',
				characterName: r.submitter.characterName,
				preferredName: r.submitter.preferredNameType,
				runCharacterName: '',
				mainClass: NgsPlayerClass.Unknown,
				subClass: NgsPlayerClass.Unknown,
				linkPov: '',
				server: '',
				nameType: r.submitter.nameEffectType,
				nameColor1: r.submitter.nameColor1,
				nameColor2: r.submitter.nameColor2,
				weapons: []
			},
			players: r.party.map(
				(pm) =>
					({
						playerId: pm.playerId ?? 0,
						playerName: pm.playerName,
						ship: pm.playerInfo.ship,
						flag: pm.playerInfo.flag ?? '',
						characterName: pm.playerInfo.characterName,
						preferredName: pm.playerInfo.preferredNameType,
						runCharacterName: pm.runCharacterName,
						mainClass: pm.mainClass,
						subClass: pm.subClass,
						linkPov: pm.linkPov,
						server: '',
						nameType: pm.playerInfo.nameEffectType,
						nameColor1: pm.playerInfo.nameColor1,
						nameColor2: pm.playerInfo.nameColor2,
						weapons: pm.weapons
					} satisfies PlayerInfo)
			)
		};
	});
};

export const tempMapRuns = (runs: Run[]) => {
	return runs.map((r) => {
		if (!r) {
			console.warn('Temp mapping Submission: null run was encountered. Skipped.');
			return;
		}

		return {
			//TODO : Temporary mapping, remove when runs refactored
			...r,
			submissionTime: r.submissionDate,
			partySize: r.party.length,
			server: r.serverRegion,
			notes: r.notes ?? '',
			submitter: {
				playerId: r.submitter.playerId,
				playerName: r.submitter.name,
				ship: r.submitter.ship,
				flag: r.submitter.flag ?? '',
				characterName: r.submitter.characterName,
				preferredName: r.submitter.preferredNameType,
				runCharacterName: '',
				mainClass: NgsPlayerClass.Unknown,
				subClass: NgsPlayerClass.Unknown,
				linkPov: '',
				server: '',
				nameType: r.submitter.nameEffectType,
				nameColor1: r.submitter.nameColor1,
				nameColor2: r.submitter.nameColor2,
				weapons: []
			},
			players: r.party.map(
				(pm) =>
					({
						playerId: pm.playerId ?? 0,
						playerName: pm.playerName,
						ship: pm.playerInfo.ship,
						flag: pm.playerInfo.flag ?? '',
						characterName: pm.playerInfo.characterName,
						preferredName: pm.playerInfo.preferredNameType,
						runCharacterName: pm.runCharacterName,
						mainClass: pm.mainClass,
						subClass: pm.subClass,
						linkPov: pm.linkPov,
						server: '',
						nameType: pm.playerInfo.nameEffectType,
						nameColor1: pm.playerInfo.nameColor1,
						nameColor2: pm.playerInfo.nameColor2,
						weapons: pm.weapons
					} satisfies PlayerInfo)
			)
		};
	});
};
