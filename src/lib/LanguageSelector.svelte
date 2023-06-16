<script lang="ts">
	import Modal from './Components/Modal.svelte';
	import { consentPreferences } from './stores/consent';
	import { locale, locales } from 'svelte-i18n';

	let modal: Modal;

	function storeLocale(localeReference) {
		if ($consentPreferences === true) {
			localStorage.setItem('language', localeReference.toString());
		}
	}

	function cleanLocale(localeReference) {
		const languageList = `{
            "en":"English (Global)",
            "en-alt":"English (Japan)",
            "ja":"日本語"
        }`;
		let cleanedLanguage = JSON.parse(languageList);
		return cleanedLanguage[localeReference];
	}
</script>

<div class="btn-ghost no-animation btn rounded-none" on:click={modal.show} on:keyup={modal.show}>
	<i class="bi bi-translate" />
</div>

<Modal
	modalId="language-modal"
	title="Language"
	allowDefocusClose
	bind:this={modal}
	btn2="Close"
	on:btn2Click={modal.close}
>
	<div class="flex flex-row flex-wrap justify-center gap-1 md:justify-start">
		{#each $locales as localeref}
			{#each [cleanLocale(localeref)] as cleanedLocale}
				<label
					class="label w-64 cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2"
				>
					<span class="label-text text-neutral-content">{cleanedLocale}</span>
					<input
						type="radio"
						bind:group={$locale}
						id="radio-classFilter-force"
						value={localeref}
						name="radio-shared-languagePreference"
						class="radio radio-sm rounded border-neutral-content/25 checked:bg-[#DBDBDB]"
						on:click={() => storeLocale(localeref)}
					/>
				</label>
			{/each}
		{/each}
	</div>
</Modal>
