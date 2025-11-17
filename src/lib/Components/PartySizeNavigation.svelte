<script module lang="ts">
	export interface PartySizeLink {
		link: string;
		label: string;
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/Components/Button.svelte';

	interface Props {
		parties: PartySizeLink[];
	}

	let { parties }: Props = $props();

	let currentLinkPath = $derived($page.url.pathname);

	const linkClick = (href: string) => {
		goto(href);
	};
</script>

{#each parties as party}
	<Button
		modifier={party.link.startsWith(currentLinkPath) ? 'primary' : 'default'}
		on:click={() => linkClick(party.link)}>{party.label}</Button
	>
{/each}
