import { writable, get } from 'svelte/store';

export const runForm = writable({
	category: '',
	players: [] as PlayerInfo[],
	time: {},
	serverRegion: ''
} as Run);
export const dfaForm = writable({} as DfaRun);
export const purpleForm = writable({} as PurpleRun);

export interface DfaRun {
	type: string;
	support: string;
}
export interface PurpleRun {
	region: string;
	rank: number;
}

export interface Run {
	userId: string;
	username: string;
	category: string;
	players: PlayerInfo[];
	time: RunTime;
	serverRegion: string;
	notes: string;
}

export interface RunTime {
	hours: number;
	minutes: number;
	seconds: number;
}

export interface PlayerInfo {
	playerId: number;
	povVideoLink: string;
	playerName: string;
	inVideoName: string;
	playerServer: string;
	mainClass: string;
	subClass: string;
	weapons: string[];
}

export const resetForm = () => {
	runForm.set({
		category: '',
		players: [] as PlayerInfo[],
		time: {}
	} as Run);
	dfaForm.set({} as DfaRun);
	purpleForm.set({} as PurpleRun);
};

export const submitForm = async () => {
	const form = get(runForm);

	let submitPath: string = '/ngs-api/';
	let runSpecifics: any = {};
	if (form.category == 'dfa') {
		const dfaReq = get(dfaForm);
		runSpecifics = dfaReq;
		submitPath += `dfa`;
	} else if (form.category == 'purples') {
		const purpleReq = get(purpleForm);
		runSpecifics = purpleReq;
		submitPath += `purples/${purpleReq.region}`;
	} else {
		return;
	}

	const request = {
		...form,
		...runSpecifics
	};

	console.log(submitPath, request);

	const response = await fetch(submitPath, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(request)
	});

	const responseBody = await response.json();
	console.log(responseBody);
	return responseBody;
};

runForm.subscribe((s) => console.log(s));
dfaForm.subscribe((s) => console.log(s));
purpleForm.subscribe((s) => console.log(s));
