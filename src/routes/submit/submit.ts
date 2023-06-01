import { get } from 'svelte/store';
import { dfaForm, indomitableForm, purpleForm, runForm } from './runStore';
import { RunCategories } from '$lib/types/api/categories';
import { partyForm } from './partyFormStore';

const dfaCategories: { [playerCount: number]: RunCategories } = {
	1: RunCategories.DfaSolo,
	2: RunCategories.DfaDuo,
	8: RunCategories.DfaParty
};

const purpleCategories: { [playerCount: number]: RunCategories } = {
	1: RunCategories.PurpleSolo,
	2: RunCategories.PurpleDuo,
	4: RunCategories.PurpleParty
};

const indomitableCategories: { [playerCount: string]: RunCategories } = {
	[RunCategories.IndomitableNexAelio]: RunCategories.IndomitableNexAelio,
	[RunCategories.IndomitableRenusRetem]: RunCategories.IndomitableRenusRetem,
	[RunCategories.IndomitableAmsKvaris]: RunCategories.IndomitableAmsKvaris,
	[RunCategories.IndomitableNilsStia]: RunCategories.IndomitableNilsStia
};

export const submitForm = async () => {
	const form = get(runForm);
	const party = get(partyForm);

	party.forEach((p) => {
		p.povVideoLink = p.povVideoLink === '' ? undefined : p.povVideoLink;
	});

	let submitPath: string = '';
	let runSpecifics: any = {};

	switch (form.category) {
		case 'dfa':
			const dfaReq = get(dfaForm);
			runSpecifics = dfaReq;
			submitPath = `/ngs-api/submissions/${dfaCategories[party.length]}`;
			break;
		case 'purples':
			const purpleReq = get(purpleForm);
			runSpecifics = purpleReq;
			submitPath = `/ngs-api/submissions/${purpleCategories[party.length]}`;
			break;
		case 'duels-indomitables':
			const indomitableReq = get(indomitableForm);
			indomitableReq.rank = 1;
			runSpecifics = indomitableReq;
			runSpecifics.augments = indomitableReq.augments === 'yes' ? true : false;
			submitPath = `/ngs-api/submissions/${indomitableCategories[indomitableReq.boss]}`;
			break;
	}

	const request = {
		...form,
		...runSpecifics,
		players: party
	};

	const response = await fetch(submitPath, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(request)
	});

	const responseBody = await response.json();
	return responseBody;
};
