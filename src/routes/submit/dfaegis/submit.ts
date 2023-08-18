import { get, writable } from 'svelte/store';
import { runForm } from '../runStore';
import { partyForm } from '../partyFormStore';
import { fetchPostApi } from '$lib/utils/fetch';
import type { SubmitResult } from '$lib/types/api/runs/submitResult';
import { clientPrincipleStore, playerInfoStore } from '$lib/stores/userLogin';
import { Weapon, parseWeapon } from '$lib/types/api/weapon';
import { NgsPlayerClass, parseNgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { CurrentSubmissionPatchCode } from '$lib/constants/patchCodes';
import { parseServerRegion } from '$lib/types/api/serverRegions';
import type { BadRequestApiError } from '$lib/types/api/error';
import type { DfAegisRunSubmission } from '$lib/types/api/validation/dfAegisSubmission';
import { DfAegisSupport } from '$lib/types/api/dfAegis/dfAegisSupports';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { NgsQuests } from '$lib/types/api/runs/quests';

const dfAegisFormStore = writable({
	category: NgsRunCategories.UrgentQuest,
	rank: 1,
	support: DfAegisSupport.AinaManon
});

const submitPath = '/ngs-api/runs/dfaegis';

export const submitDfAegisRun = async () => {
	const clientPrincipal = get(clientPrincipleStore);
	const playerInfo = get(playerInfoStore);
	if (!clientPrincipal || !playerInfo) {
		throw new Error('Not logged in.');
	}

	const form = get(runForm);
	const party = get(partyForm);
	const dfAegisDetails = get(dfAegisForm);

	const submitParty = party.map((p, i) => {
		p.povVideoLink = p.povVideoLink === '' ? undefined : p.povVideoLink;

		return {
			playerId: p.playerId == -1 ? undefined : p.playerId,
			ordinal: Math.floor(i / 4),
			povLink: p.povVideoLink === '' ? undefined : p.povVideoLink,
			inVideoName: p.inVideoName,
			mainClass: parseNgsPlayerClass(p.mainClass) ?? NgsPlayerClass.Unknown,
			subClass: parseNgsPlayerClass(p.subClass) ?? NgsPlayerClass.Unknown,
			weapons: p.weapons.map((w) => parseWeapon(w) ?? Weapon.Unknown)
		};
	});

	const request: DfAegisRunSubmission = {
		...form,
		submitterUserId: clientPrincipal.userId,
		submitterName: playerInfo.playerName,
		serverRegion: parseServerRegion(form.serverRegion),
		quest: NgsQuests.DfAegis,
		questRank: dfAegisDetails.rank,
		patch: CurrentSubmissionPatchCode,
		category: dfAegisDetails.category,
		details: { support: dfAegisDetails.support },
		party: submitParty
	};

	const response = await fetchPostApi<SubmitResult | BadRequestApiError>(submitPath, request);
	return response;
};

export const dfAegisForm = {
	...dfAegisFormStore,
	submitDfSolusRun: submitDfAegisRun
};
