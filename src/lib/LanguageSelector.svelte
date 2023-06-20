<script lang="ts">
	import Modal from './Components/Modal.svelte';
	import { onMount } from 'svelte';
	import { consentSelected, consentPreferences } from './stores/consent';
	import { locale, locales } from 'svelte-i18n';
	import { siteLanguage } from './stores/preferences';
	import { derived } from 'svelte/store';

	const languageOptions: Record<string, { label: string }> = {
		en: { label: 'English (Global)' },
		'en-alt': { label: 'English (Japan)' },
		ja: { label: '日本語' }
	};

	const allowPreferenceStorage = derived([consentSelected, consentPreferences], (s) => {
		return s[0] === true && s[1] === true;
	});

	let modal: Modal;
	let languageSelection: string = initLanguage();

	onMount(() => {
		if ($allowPreferenceStorage) {
			languageSelection = !languageOptions[$siteLanguage] ? 'en' : $siteLanguage;
		} else {
			clearPreferences();
		}
	});

	function initLanguage() {
		if ($allowPreferenceStorage) {
			return !languageOptions[$siteLanguage] ? 'en' : $siteLanguage;
		}
		return 'en';
	}

	const updatePreferences = () => {
		if ($allowPreferenceStorage) {
			$siteLanguage = languageSelection;
		}
		$locale = languageSelection;
	};

	allowPreferenceStorage.subscribe(updatePreferences);

	const clearPreferences = () => ($siteLanguage = '');
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
		{#each $locales as availableLocaleCode}
			<label
				class="label w-64 cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2"
			>
				<span class="label-text text-neutral-content"
					>{languageOptions[availableLocaleCode].label}</span
				>
				<input
					type="radio"
					class="radio radio-sm rounded border-neutral-content/25 checked:bg-[#DBDBDB]"
					name="language-pref-selection"
					value={availableLocaleCode}
					bind:group={languageSelection}
					on:change={updatePreferences}
				/>
			</label>
		{/each}
	</div>
</Modal>
