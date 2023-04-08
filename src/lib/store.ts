import { writable } from 'svelte/store';

const { subscribe, set, update } = writable({});

export const userContext = { subscribe };

export async function fetchData() {
  try {
    const response = await fetch('/.auth/me');
    const data = await response.json();
    const { clientPrincipal } = data;
    set({ userId: clientPrincipal.userId });
  } catch (error) {
    console.error(error);
  }
}