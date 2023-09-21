/// <reference types="svelte-adapter-azure-swa" />

import type { ClientPrincipal } from 'svelte-adapter-azure-swa';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			clientPrincipal?: ClientPrincipal;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
