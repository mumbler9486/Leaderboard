<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';

	interface Props {
		publicationDateIso: string;
		lastUpdatedIso?: string | undefined;
		title: string;
		children?: import('svelte').Snippet;
	}

	let {
		publicationDateIso,
		lastUpdatedIso = undefined,
		title,
		children
	}: Props = $props();

	let publicationDateObj = $derived(new Date(publicationDateIso));
	let lastUpdatedObj = $derived(new Date(lastUpdatedIso ?? ''));
</script>

<div>
	<Divider />
	<div class="text-center text-2xl font-medium">
		{title}
	</div>
	<p class="mb-4">
		<em class="text-xs"
			>Published: {publicationDateObj.toLocaleDateString()}
			{#if !!lastUpdatedIso}
				(Updated {lastUpdatedObj.toLocaleString()})
			{/if}
		</em>
	</p>
	{#if children}{@render children()}{:else}
		<em>No content</em>
	{/if}
</div>
