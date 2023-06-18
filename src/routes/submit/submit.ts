import { get } from 'svelte/store';
import { dfaForm, indomitableForm, purpleForm, runForm, type IndomitableRun } from './runStore';
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
	[RunCategories.IndomitableNilsStia]: RunCategories.IndomitableNilsStia,
	[RunCategories.IndomitableHalvaldi]: RunCategories.IndomitableHalvaldi
};

export const submitForm = async () => {
	const form = get(runForm);
	const party = get(partyForm);

	await setLoginInfoToForm();

	party.forEach((p) => {
		p.povVideoLink = p.povVideoLink === '' ? undefined : p.povVideoLink;
	});

	let submitPath: string = '';
	let runSpecifics: any = {};

	switch (form.category) {
		case 'dfa':
			runSpecifics = getDfaRunData();
			submitPath = `/ngs-api/submissions/${dfaCategories[party.length]}`;
			break;
		case 'purples':
			runSpecifics = getPurpleRunData();
			submitPath = `/ngs-api/submissions/${purpleCategories[party.length]}`;
			break;
		case 'duels-indomitables':
			runSpecifics = getIndomitableRunData();
			submitPath = `/ngs-api/submissions/${indomitableCategories[runSpecifics.boss]}`;
			break;
		default:
			throw Error('Unknown category');
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

const getDfaRunData = () => {
	const dfaReq = get(dfaForm);
	const runSpecifics: any = structuredClone(dfaReq);
	return runSpecifics;
};

const getPurpleRunData = () => {
	const purpleReq = get(purpleForm);
	const runSpecifics: any = structuredClone(purpleReq);
	return runSpecifics;
};

const getIndomitableRunData = () => {
	const indomitableReq = get(indomitableForm);
	const runSpecifics: any = structuredClone(indomitableReq);
	runSpecifics.rank = 1;
	runSpecifics.augments = indomitableReq.augments === 'yes' ? true : false;
	return runSpecifics;
};

const setLoginInfoToForm = async () => {
	try {
		const res = await fetch('/.auth/me');
		const clientPrincipal = (await res.json()).clientPrincipal;

		runForm.update((form) => {
			form.userId = clientPrincipal.userId as string;
			form.username = clientPrincipal.userDetails as string;
			return form;
		});
	} catch (err) {
		console.error('Failed to get user login', err);
		throw err;
	}
};
