import { convertTimeToRunTime } from '$lib/server/db/util/datetime';
import { dbValToClassMap } from '$lib/server/db/util/ngsClass';
import { dbValToWeaponsMap } from '$lib/server/db/util/weaponType';
import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import type { PlayerInfo } from '$lib/types/api/playerInfo';
import type { PurpleSubmission } from '$lib/types/api/submissions/submissions';
import type { PurpleDuoDbModel } from '$lib/server/types/db/purple/purpleDuo';
import type { PurplePartyDbModel } from '$lib/server/types/db/purple/purpleParty';
import type { PurpleSoloDbModel } from '$lib/server/types/db/purple/purpleSolo';

export const mapPurpleSoloToSubmission = (recordset: PurpleSoloDbModel[]): PurpleSubmission[] => {
	const mapped = recordset.map((s) => {
		const player1: PlayerInfo = {
			playerId: parseInt(s.PlayerID),
			playerName: s.PlayerName,
			characterName: s.PlayerCName,
			preferredName: parseInt(s.PlayerPrefN),
			runCharacterName: s.RunCharacter,
			mainClass: dbValToClassMap[s.MainClass],
			subClass: dbValToClassMap[s.SubClass],
			flag: undefined,
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
		//TODO fix on DB and submission page
		runTime.seconds = runTime.minutes;
		runTime.minutes = runTime.hours;
		runTime.hours = 0;

		const submission: PurpleSubmission = {
			category: `purple${player1.nameColor1}`,
			runId: parseInt(s.RunID),
			patch: s.Patch,
			region: s.Region,
			rank: parseInt(s.Rank),
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

export const mapPurpleDuoToSubmission = (recordset: PurpleDuoDbModel[]): PurpleSubmission[] => {
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
		//TODO fix on DB and submission page
		runTime.seconds = runTime.minutes;
		runTime.minutes = runTime.hours;
		runTime.hours = 0;

		const submission: PurpleSubmission = {
			category: `purple${player1.nameColor1}`,
			runId: parseInt(s.RunID),
			patch: s.Patch,
			region: s.Region,
			rank: parseInt(s.Rank),
			time: runTime,
			players: players,
			partySize: players.length,
			submitter: submitter,
			notes: s.Notes,
			submissionTime: s.SubmissionTime,
			server: '' // TODO
		};

		return submission;
	});
	return mapped;
};

export const mapPurplePartyToSubmission = (recordset: PurplePartyDbModel[]): PurpleSubmission[] => {
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

		const players = [player1, player2, player3, player4];

		const runTime = convertTimeToRunTime(new Date(s.Time));
		//TODO fix on DB and submission page
		runTime.seconds = runTime.minutes;
		runTime.minutes = runTime.hours;
		runTime.hours = 0;

		const submission: PurpleSubmission = {
			category: `purple${player1.nameColor1}`,
			runId: parseInt(s.RunID),
			patch: s.Patch,
			region: s.Region,
			rank: parseInt(s.Rank),
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
