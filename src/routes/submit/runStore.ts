import { writable, get } from 'svelte/store';

export const runForm = writable({
	category: '',
	players: [] as PlayerInfo[],
	time: {},
	serverRegion: ''
} as Run);
export const dfaForm = writable({} as DfaRun);
export const purpleForm = writable({} as PurpleRun);
export const indomitableForm = writable({} as IndomitableRun);

export interface DfaRun {
	type: string;
	support: string;
}
export interface PurpleRun {
	region: string;
	rank: number;
}

export interface IndomitableRun {
	boss: string;
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
	povVideoLink?: string;
	playerName: string;
	inVideoName: string;
	playerServer: string;
	mainClass: string;
	subClass: string;
	weapons: string[];
}

export const resetForm = () => {
	const form = get(runForm);

	runForm.set({
		category: form.category,
		players: [] as PlayerInfo[],
		time: {}
	} as Run);
	dfaForm.set({} as DfaRun);
	purpleForm.set({} as PurpleRun);
	indomitableForm.set({} as IndomitableRun);
};

export const submitForm = async () => {
	let form = get(runForm);

	form.players.forEach((p) => {
		p.povVideoLink = p.povVideoLink === '' ? undefined : p.povVideoLink;
	});

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
	} else if (form.category == 'duels-indomitables') {
		const indomitableReq = get(indomitableForm);
		indomitableReq.rank = 1;
		runSpecifics = indomitableReq;
		submitPath += `duels/indomitable/${indomitableReq.boss}`;
	}

	const request = {
		...form,
		...runSpecifics
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

export const resetPlayerSize = (players: number) => {
	runForm.update((f) => {
		if (players == 0) {
			f.players = [];
			return f;
		}

		f.players = [...Array(players).keys()].map((p) => ({
			playerId: -1,
			povVideoLink: undefined,
			playerName: '',
			inVideoName: '',
			playerServer: '',
			mainClass: '',
			subClass: '',
			weapons: []
		}));
		return f;
	});
};
