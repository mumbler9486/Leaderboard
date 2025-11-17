<script lang="ts">
	import Modal from '../../Components/Modal.svelte';
	import { locale, locales } from 'svelte-i18n';
	import { siteLanguage } from '../../stores/preferences';
	import { Language } from 'svelte-heros-v2';
	import TranslateIcon from '$lib/Components/Icons/TranslateIcon.svelte';

	let modal: Modal = $state();

	const languageOptions: Record<string, { label: string }> = {
		en: { label: 'English (Global)' },
		'en-alt': { label: 'English (Japan)' },
		ja: { label: '日本語' },
	};

	const updatePreferences = () => {
		$locale = $siteLanguage;
	};
</script>

<!-- TODO icon -->

<button class="btn btn-ghost" onclick={modal.show} onkeyup={modal.show}>
	<TranslateIcon />
</button>

<Modal
	modalId="language-modal"
	size="narrow"
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
					bind:group={$siteLanguage}
					onchange={updatePreferences}
				/>
			</label>
		{/each}
	</div>
</Modal>
