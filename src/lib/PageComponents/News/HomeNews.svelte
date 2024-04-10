<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';

	export let publicationDateIso: string; // UTC time, iso format
	export let lastUpdatedIso: string | undefined = undefined; // UTC time, iso format
	export let title: string;

	$: publicationDateObj = new Date(publicationDateIso);
	$: lastUpdatedObj = new Date(lastUpdatedIso ?? '');
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
	<slot>
		<em>No content</em>
	</slot>
</div>
