import { convertTimeToRunTime } from '$lib/server/db/util/datetime';
import { dbValToClassMap } from '$lib/server/db/util/ngsClass';
import { dbValToWeaponsMap } from '$lib/server/db/util/weaponType';
import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import type { PlayerInfo } from '$lib/types/api/playerInfo';
import type { DfaSubmission } from '$lib/types/api/submissions/submissions';
import type { DfaDuoDbModel } from '$lib/types/db/dfa/dfaDuo';
import type { DfaPartyDbModel } from '$lib/types/db/dfa/dfaParty';
import type { DfaSoloDbModel } from '$lib/types/db/dfa/dfaSolo';

const triggerDbMap: { [key: string]: string } = {
	'1': 'trigger',
	'0': 'uq'
};

export const mapDfaSoloToSubmission = (recordset: DfaSoloDbModel[]): DfaSubmission[] => {
	const mapped = recordset.map((s) => {
		const player1: PlayerInfo = {
			playerId: parseInt(s.PlayerID),
			playerName: s.PlayerName,
			characterName: s.PlayerCName,
			preferredName: parseInt(s.PlayerPrefN),
			runCharacterName: s.RunCharacter,
			mainClass: dbValToClassMap[s.MainClass],
			subClass: dbValToClassMap[s.SubClass],
			flag: undefined, //TODO
			ship: undefined,
			linkPov: s.Link,
			server: s.PlayerServer,
			nameType: parseInt(s.PlayerNameType),
			nameColor1: s.PlayerNameColor1,
			nameColor2: s.PlayerNameColor2,
			weapons: [s.W1, s.W2, s.W3, s.W4, s.W5, s.W6]
				.filter((w) => !!w)
				.map((w) => dbValToWeaponsMap[w == 'soaring blades' ? 'sb' : w]) //TODO make this weapon definition consistent
		};

		const submitter: PlayerInfo = {
			playerId: parseInt(s.SubmitterID),
			playerName: s.SubmitterName,
			characterName: s.SubmitterCName,
			preferredName: parseInt(s.SubmitterPrefN),
			runCharacterName: '',
			mainClass: NgsPlayerClass.Unknown,
			subClass: NgsPlayerClass.Unknown,
			linkPov: undefined,
			server: undefined,
			flag: undefined,
			ship: undefined,
			nameType: parseInt(s.SubmitterNameType),
			nameColor1: s.SubmitterNameColor1,
			nameColor2: s.SubmitterNameColor2,
			weapons: []
		};

		const players = [player1];

		const runTime = convertTimeToRunTime(new Date(s.Time));

		const submission: DfaSubmission = {
			category: `dfa${player1.nameColor1}`, //TODO
			runId: parseInt(s.RunID),
			patch: s.Patch,
			buff: s.Support,
			drill: triggerDbMap[s.Drill],
			time: runTime,
			players: players,
			partySize: players.length,
			submitter: submitter,
			notes: s.Notes,
			submissionTime: s.SubmissionTime,
			server: ''
		};

		return submission;
	});
	return mapped;
};

export const mapDfaDuoToSubmission = (recordset: DfaDuoDbModel[]): DfaSubmission[] => {
	const mapped = recordset.map((s) => {
		const player1: PlayerInfo = {
			playerId: parseInt(s.P1PlayerID),
			playerName: s.P1PlayerName,
			characterName: s.P1PlayerCName,
			preferredName: parseInt(s.P1PlayerPrefN),
			runCharacterName: s.P1RunCharacter,
			mainClass: dbValToClassMap[s.P1MainClass],
			subClass: dbValToClassMap[s.P1SubClass],
			flag: undefined,
			ship: undefined,
			linkPov: s.P1Link,
			server: s.P1PlayerServer,
			nameType: parseInt(s.P1PlayerNameType),
			nameColor1: s.P1PlayerNameColor1,
			nameColor2: s.P1PlayerNameColor2,
			weapons: []
		};

		const player2: PlayerInfo = {
			playerId: parseInt(s.P2PlayerID),
			playerName: s.P2PlayerName,
			characterName: s.P2PlayerCName,
			preferredName: parseInt(s.P2PlayerPrefN),
			runCharacterName: s.P2RunCharacter,
			mainClass: dbValToClassMap[s.P2MainClass],
			subClass: dbValToClassMap[s.P2SubClass],
			flag: undefined,
			ship: undefined,
			linkPov: s.P2Link,
			server: s.P2PlayerServer,
			nameType: parseInt(s.P2PlayerNameType),
			nameColor1: s.P2PlayerNameColor1,
			nameColor2: s.P2PlayerNameColor2,
			weapons: []
		};

		const submitter: PlayerInfo = {
			playerId: parseInt(s.SubmitterID),
			playerName: s.SubmitterName,
			characterName: s.SubmitterCName,
			preferredName: parseInt(s.SubmitterPrefN),
			runCharacterName: '',
			mainClass: NgsPlayerClass.Unknown,
			subClass: NgsPlayerClass.Unknown,
			linkPov: undefined,
			server: undefined,
			flag: undefined,
			ship: undefined,
			nameType: parseInt(s.SubmitterNameType),
			nameColor1: s.SubmitterNameColor1,
			nameColor2: s.SubmitterNameColor2,
			weapons: []
		};

		const players = [player1, player2];

		const runTime = convertTimeToRunTime(new Date(s.Time));

		const submission: DfaSubmission = {
			category: `dfa${player1.nameColor1}`,
			runId: parseInt(s.RunID),
			patch: s.Patch,
			buff: s.Buff,
			drill: triggerDbMap[s.Drill],
			time: runTime,
			players: players,
			partySize: players.length,
			submitter: submitter,
			notes: s.Notes,
			submissionTime: s.SubmissionTime,
			server: ''
		};

		return submission;
	});
	return mapped;
};

export const mapDfaPartyToSubmission = (recordset: DfaPartyDbModel[]): DfaSubmission[] => {
	const mapped = recordset.map((s) => {
		const player1: PlayerInfo = {
			playerId: parseInt(s.P1PlayerID),
			playerName: s.P1PlayerName,
			characterName: s.P1PlayerCName,
			preferredName: parseInt(s.P1PlayerPrefN),
			runCharacterName: s.P1RunCharacter,
			mainClass: dbValToClassMap[s.P1MainClass],
			subClass: dbValToClassMap[s.P1SubClass],
			flag: undefined,
			ship: undefined,
			linkPov: s.P1Link,
			server: s.P1PlayerServer,
			nameType: parseInt(s.P1PlayerNameType),
			nameColor1: s.P1PlayerNameColor1,
			nameColor2: s.P1PlayerNameColor2,
			weapons: []
		};

		const player2: PlayerInfo = {
			playerId: parseInt(s.P2PlayerID),
			playerName: s.P2PlayerName,
			characterName: s.P2PlayerCName,
			preferredName: parseInt(s.P2PlayerPrefN),
			runCharacterName: s.P2RunCharacter,
			mainClass: dbValToClassMap[s.P2MainClass],
			subClass: dbValToClassMap[s.P2SubClass],
			flag: undefined,
			ship: undefined,
			linkPov: s.P2Link,
			server: s.P2PlayerServer,
			nameType: parseInt(s.P2PlayerNameType),
			nameColor1: s.P2PlayerNameColor1,
			nameColor2: s.P2PlayerNameColor2,
			weapons: []
		};

		const player3: PlayerInfo = {
			playerId: parseInt(s.P3PlayerID),
			playerName: s.P3PlayerName,
			characterName: s.P3PlayerCName,
			preferredName: parseInt(s.P3PlayerPrefN),
			runCharacterName: s.P3RunCharacter,
			mainClass: dbValToClassMap[s.P3MainClass],
			subClass: dbValToClassMap[s.P3SubClass],
			flag: undefined,
			ship: undefined,
			linkPov: s.P3Link,
			server: s.P3PlayerServer,
			nameType: parseInt(s.P3PlayerNameType),
			nameColor1: s.P3PlayerNameColor1,
			nameColor2: s.P3PlayerNameColor2,
			weapons: []
		};

		const player4: PlayerInfo = {
			playerId: parseInt(s.P4PlayerID),
			playerName: s.P4PlayerName,
			characterName: s.P4PlayerCName,
			preferredName: parseInt(s.P4PlayerPrefN),
			runCharacterName: s.P4RunCharacter,
			mainClass: dbValToClassMap[s.P4MainClass],
			subClass: dbValToClassMap[s.P4SubClass],
			flag: undefined,
			ship: undefined,
			linkPov: s.P4Link,
			server: s.P4PlayerServer,
			nameType: parseInt(s.P4PlayerNameType),
			nameColor1: s.P4PlayerNameColor1,
			nameColor2: s.P4PlayerNameColor2,
			weapons: []
		};

		const player5: PlayerInfo = {
			playerId: parseInt(s.P5PlayerID),
			playerName: s.P5PlayerName,
			characterName: s.P5PlayerCName,
			preferredName: parseInt(s.P5PlayerPrefN),
			runCharacterName: s.P5RunCharacter,
			mainClass: dbValToClassMap[s.P5MainClass],
			subClass: dbValToClassMap[s.P5SubClass],
			flag: undefined,
			ship: undefined,
			linkPov: s.P5Link,
			server: s.P5PlayerServer,
			nameType: parseInt(s.P5PlayerNameType),
			nameColor1: s.P5PlayerNameColor1,
			nameColor2: s.P5PlayerNameColor2,
			weapons: []
		};

		const player6: PlayerInfo = {
			playerId: parseInt(s.P6PlayerID),
			playerName: s.P6PlayerName,
			characterName: s.P6PlayerCName,
			preferredName: parseInt(s.P6PlayerPrefN),
			runCharacterName: s.P6RunCharacter,
			mainClass: dbValToClassMap[s.P6MainClass],
			subClass: dbValToClassMap[s.P6SubClass],
			flag: undefined,
			ship: undefined,
			linkPov: s.P6Link,
			server: s.P6PlayerServer,
			nameType: parseInt(s.P6PlayerNameType),
			nameColor1: s.P6PlayerNameColor1,
			nameColor2: s.P6PlayerNameColor2,
			weapons: []
		};

		const player7: PlayerInfo = {
			playerId: parseInt(s.P7PlayerID),
			playerName: s.P7PlayerName,
			characterName: s.P7PlayerCName,
			preferredName: parseInt(s.P7PlayerPrefN),
			runCharacterName: s.P7RunCharacter,
			mainClass: dbValToClassMap[s.P7MainClass],
			subClass: dbValToClassMap[s.P7SubClass],
			flag: undefined,
			ship: undefined,
			linkPov: s.P7Link,
			server: s.P7PlayerServer,
			nameType: parseInt(s.P7PlayerNameType),
			nameColor1: s.P7PlayerNameColor1,
			nameColor2: s.P7PlayerNameColor2,
			weapons: []
		};

		const player8: PlayerInfo = {
			playerId: parseInt(s.P8PlayerID),
			playerName: s.P8PlayerName,
			characterName: s.P8PlayerCName,
			preferredName: parseInt(s.P8PlayerPrefN),
			runCharacterName: s.P8RunCharacter,
			mainClass: dbValToClassMap[s.P8MainClass],
			subClass: dbValToClassMap[s.P8SubClass],
			flag: undefined,
			ship: undefined,
			linkPov: s.P8Link,
			server: s.P8PlayerServer,
			nameType: parseInt(s.P8PlayerNameType),
			nameColor1: s.P8PlayerNameColor1,
			nameColor2: s.P8PlayerNameColor2,
			weapons: []
		};

		const submitter: PlayerInfo = {
			playerId: parseInt(s.SubmitterID),
			playerName: s.SubmitterName,
			characterName: s.SubmitterCName,
			preferredName: parseInt(s.SubmitterPrefN),
			runCharacterName: '',
			mainClass: NgsPlayerClass.Unknown,
			subClass: NgsPlayerClass.Unknown,
			linkPov: undefined,
			server: undefined,
			flag: undefined,
			ship: undefined,
			nameType: parseInt(s.SubmitterNameType),
			nameColor1: s.SubmitterNameColor1,
			nameColor2: s.SubmitterNameColor2,
			weapons: []
		};

		const players = [player1, player2, player3, player4, player5, player6, player7, player8];

		const runTime = convertTimeToRunTime(new Date(s.Time));

		const submission: DfaSubmission = {
			category: `dfa${player1.nameColor1}`,
			runId: parseInt(s.RunID),
			patch: s.Patch,
			buff: s.Buff,
			drill: triggerDbMap[s.Drill],
			time: runTime,
			players: players,
			partySize: players.length,
			submitter: submitter,
			notes: s.Notes,
			submissionTime: s.SubmissionTime,
			server: ''
		};

		return submission;
	});
	return mapped;
};
