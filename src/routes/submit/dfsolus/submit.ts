import { get, writable } from 'svelte/store';
import { runForm } from '../runStore';
import { partyForm } from '../partyFormStore';
import { fetchPostApi } from '$lib/utils/fetch';
import type { DfSolusRunSubmission } from '$lib/types/api/validation/dfSolusSubmission';
import type { SubmitResult } from '$lib/types/api/runs/submitResult';
import { clientPrincipleStore, playerInfoStore } from '$lib/stores/userLogin';
import { Weapon, parseWeapon } from '$lib/types/api/weapon';
import { NgsPlayerClass, parseNgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { CurrentSubmissionPatchCode } from '$lib/constants/patchCodes';
import { parseServerRegion } from '$lib/types/api/serverRegions';
import type { BadRequestApiError } from '$lib/types/api/error';

const dfSolusFormStore = writable({
	rank: 1,
	category: 'quest'
});

const submitPath = '/ngs-api/runs/dfsolus';

export const submitDfSolusRun = async () => {
	const clientPrincipal = get(clientPrincipleStore);
	const playerInfo = get(playerInfoStore);
	if (!clientPrincipal || !playerInfo) {
		throw new Error('Not logged in.');
	}

	const form = get(runForm);
	const party = get(partyForm);
	const solusDetails = get(solusForm);

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

	const request: DfSolusRunSubmission = {
		...form,
		submitterUserId: clientPrincipal.userId,
		submitterName: playerInfo.playerName,
		serverRegion: parseServerRegion(form.serverRegion),
		quest: 'dfsolus',
		questRank: solusDetails.rank,
		patch: CurrentSubmissionPatchCode,
		category: solusDetails.category,
		party: submitParty
	};

	const response = await fetchPostApi<SubmitResult | BadRequestApiError>(submitPath, request);
	return response;
};

export const solusForm = {
	...dfSolusFormStore,
	submitDfSolusRun: submitDfSolusRun
};
