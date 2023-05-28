import { convertTimeToRunTime } from '$lib/server/db/util/datetime';
import { dbValToClassMap } from '$lib/server/db/util/ngsClass';
import { dbValToWeaponsMap } from '$lib/server/db/util/weaponType';
import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import type { PlayerInfo } from '$lib/types/api/playerInfo';
import type { IndomitableSubmission } from '$lib/types/api/submissions/submissions';
import type { IndomitableDbModel } from '$lib/server/types/db/submissions/duels/indomitable';
import { RunCategories } from '$lib/types/api/categories';

const bossMap: { [key: string]: string } = {
	[RunCategories.IndomitableNexAelio]: 'nexaelio',
	[RunCategories.IndomitableRenusRetem]: 'renusretem',
	[RunCategories.IndomitableAmsKvaris]: 'amskvaris',
	[RunCategories.IndomitableNilsStia]: 'nilsstia'
};

export const mapIndomitableDuel = (
	recordset: IndomitableDbModel[],
	category: string
): IndomitableSubmission[] => {
	const mapped = recordset.map((s) => {
		const player1: PlayerInfo = {
			playerId: parseInt(s.PlayerID),
			playerName: s.PlayerName,
			characterName: s.PlayerCName,
			preferredName: parseInt(s.PlayerPrefN),
			runCharacterName: s.RunCharacterName,
			mainClass: dbValToClassMap[s.MainClass],
			subClass: dbValToClassMap[s.SubClass],
			flag: undefined,
			ship: undefined,
			linkPov: s.Link,
			server: s.PlayerServer,
			nameType: parseInt(s.PlayerNameType),
			nameColor1: s.PlayerNameColor1,
			nameColor2: s.PlayerNameColor2,
			weapons: [
				s.WeaponInfo1,
				s.WeaponInfo2,
				s.WeaponInfo3,
				s.WeaponInfo4,
				s.WeaponInfo5,
				s.WeaponInfo6
			]
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

		const runTime = convertTimeToRunTime(new Date(s.RunTime));

		const submission: IndomitableSubmission = {
			category: category,
			runId: parseInt(s.SubmissionId),
			patch: s.Patch,
			boss: bossMap[category],
			rank: parseInt(s.Rank),
			augments: parseInt(s.Augments) == 0 ? false : true,
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
