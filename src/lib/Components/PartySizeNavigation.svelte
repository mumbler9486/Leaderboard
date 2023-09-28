<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/Components/Button.svelte';

	export let parties: { link: string; label: string }[];

	const highlightClass = 'btn-primary';

	$: currentLinkPath = $page.url.pathname;

	const linkClick = (href: string) => {
		goto(href);
	};
</script>

{#each parties as party}
	<Button
		class={currentLinkPath === party.link ? highlightClass : ''}
		primary={currentLinkPath === party.link}
		on:click={() => linkClick(party.link)}>{party.label}</Button
	>
{/each}
