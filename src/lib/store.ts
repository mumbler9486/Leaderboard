import { writable } from 'svelte/store';

const { subscribe, set, update } = writable({});

export const userContext = { subscribe };

async function fetchData() {
	fetch('/.auth/me')
		.then((response) => response.json())
		.then((data) => {
			const { clientPrincipal } = data;
			set({ userId: clientPrincipal.userId });
		})
		.catch((error) => console.error(error));
}

export const userData = fetchData();
