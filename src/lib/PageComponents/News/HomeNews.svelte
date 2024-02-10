<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';

	export let publicationDate: string; // UTC time
	export let lastUpdated: string | undefined = undefined; // UTC time
	export let title: string;

	$: publicationDateObj = new Date(publicationDate);
	$: lastUpdatedObj = new Date(publicationDate);
</script>

<div>
	<Divider />
	<div class="text-center text-2xl font-medium">
		{title}
	</div>
	<p class="mb-4">
		<em class="text-xs"
			>Published: {publicationDateObj.toLocaleDateString()}
			{#if !!lastUpdated}
				(Updated {lastUpdatedObj.toLocaleString()})
			{/if}
		</em>
	</p>
	<slot>
		<em>No content</em>
	</slot>
</div>
