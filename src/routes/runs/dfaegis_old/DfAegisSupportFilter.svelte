<script lang="ts">
	import RadioButton from '$lib/Components/RadioButton.svelte';
	import { DfAegisSupport } from '$lib/types/api/dfAegis/dfAegisSupports';
	import { t } from 'svelte-i18n';
	import { runFilters } from '../runFilter';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';

	export let selectedSupport: string = 'no_filter';

	const filterSupports = [
		{ name: 'No Filter', value: 'no_filter', icon: '/icons/class/class-unknown.png' },
		{ name: 'Aina & Manon', value: DfAegisSupport.AinaManon, icon: '/icons/dfaegis/ainamanon.png' },
		{ name: 'Nadereh', value: DfAegisSupport.Nadereh, icon: '/icons/dfaegis/nadereh.png' },
		{ name: 'Ilma', value: DfAegisSupport.Ilma, icon: '/icons/dfaegis/ilma.png' },
		{ name: 'Glen', value: DfAegisSupport.Glen, icon: '/icons/dfaegis/glen.png' },
	];

	$: isQuestCategory = $runFilters.category === NgsRunCategories.Quest;
</script>

<div class="flex flex-row flex-wrap justify-center gap-1 md:justify-start">
	{#each filterSupports as support}
		<RadioButton
			bind:group={selectedSupport}
			value={support.value}
			name="filter-dfa-support"
			icon={support.icon}
			alt={support.name}
			disabled={isQuestCategory}
		>
			{support.name}
		</RadioButton>
	{/each}
</div>
