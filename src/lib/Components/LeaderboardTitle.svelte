<script lang="ts">
	import Divider from './Divider.svelte';

	export let category: string = 'No Assigned Title';
	export let subCategory: string = '';
</script>

<div
	class="container mx-auto mt-4 flex items-center justify-center rounded-md border border-secondary bg-base-100/75 p-4 md:p-4"
>
	<span
		class="text-center text-4xl font-light drop-shadow-[2px_4px_6px_rgba(0,0,0,0.8)] md:text-4xl"
		>{category}
		{#if subCategory !== ''}
			<Divider />
		{/if}
		{subCategory}</span
	>
</div>
