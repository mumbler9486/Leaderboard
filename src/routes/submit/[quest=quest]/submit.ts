import { get } from 'svelte/store';
import { clientPrincipleStore, playerInfoStore } from '$lib/stores/userLogin';
import { NgsPlayerClass, parseNgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
import { NgsWeapon, parseNgsWeapon } from '$lib/types/api/weapon';
import type { RunSubmissionRequest } from '$lib/types/api/validation/runSubmission';
import { CurrentSubmissionPatchCode } from '$lib/constants/patchCodes';
import { parseServerRegion } from '$lib/types/api/serverRegions';
import { fetchPostApi } from '$lib/utils/fetch';
import type { SubmitResult } from '$lib/types/api/runs/submitResult';
import type { BadRequestApiError } from '$lib/types/api/error';
import { UserRole } from '$lib/types/api/users/userRole';
import { partyForm } from './forms/partyForm';
import { NgsQuests } from '$lib/types/api/runs/quests';
import { NgsRunCategories } from '$lib/types/api/runs/categories';
import { runForm } from './forms/runForm';
import { dfAegisRunForm } from './forms/dfAegisForm';
import { duelsRunForm } from './forms/duelsForm';
import { duelMasqRunForm } from './forms/duelMasqForm';

export const submitRun = async (
	submitPath: string,
	quest: NgsQuests,
	category: NgsRunCategories,
	questRank: number
) => {
	const clientPrincipal = get(clientPrincipleStore);
	const playerInfo = get(playerInfoStore);
	if (!clientPrincipal || !playerInfo) {
		throw new Error('Not logged in.');
	}

	const form = get(runForm);
	const party = get(partyForm);

	// Party Details
	const submitParty = party.map((p, i) => {
		p.povVideoLink = p.povVideoLink === '' ? undefined : p.povVideoLink;

		return {
			playerId: p.playerId == -1 ? undefined : p.playerId,
			ordinal: Math.floor(i / 4),
			povLink: p.povVideoLink === '' ? undefined : p.povVideoLink,
			inVideoName: p.inVideoName,
			mainClass: parseNgsPlayerClass(p.mainClass) ?? NgsPlayerClass.Unknown,
			subClass: parseNgsPlayerClass(p.subClass) ?? NgsPlayerClass.Unknown,
			weapons: p.weapons.map((w) => parseNgsWeapon(w) ?? NgsWeapon.Unknown),
		};
	});

	// Category Specific details
	const details = getCategoryFormDetails(quest, category);

	// Not moderator, force player 1 to be current user
	if (!clientPrincipleStore.hasRole(UserRole.Moderator)) {
		submitParty[0].playerId = playerInfo.playerId;
	}

	const request: RunSubmissionRequest = {
		...form,
		submitterUserId: clientPrincipal.userId,
		submitterName: playerInfo.playerName,
		serverRegion: parseServerRegion(form.serverRegion),
		quest: quest,
		questRank: questRank,
		patch: CurrentSubmissionPatchCode,
		category: category,
		party: submitParty,
		details: details,
	};

	const response = await fetchPostApi<SubmitResult | BadRequestApiError>(submitPath, request);
	return response;
};

const getCategoryFormDetails = (quest: NgsQuests, category: NgsRunCategories) => {
	if (quest === NgsQuests.DfAegis) {
		return get(dfAegisRunForm);
	} else if (quest === NgsQuests.Duels) {
		return get(duelsRunForm);
	} else if (quest === NgsQuests.ExtraDuels && category === NgsRunCategories.Masquerade) {
		return get(duelMasqRunForm);
	}
};
