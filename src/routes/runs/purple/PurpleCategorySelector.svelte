<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let region: string = 'stia';
	export let rank: string = '1';

	const validRankMap: { [region: string]: number[] } = {
		aelio: [1, 2, 3, 4],
		retem: [1, 2, 3, 4],
		kvaris: [1, 2],
		stia: [1],
	};

	$: regionSelections = generateRegionSelections(validRankMap[region] ?? []);

	const generateRegionSelections = (ranks: number[]) => {
		if (ranks.length == 0) return [];
		const options = ranks.map((r) => ({ label: r.toString(), value: r.toString() }));
		rank = options[options.length - 1].value;
		return options;
	};

	const applyFilters = () => {
		dispatch('changed', {
			region: region,
			rank: rank,
		});
	};
</script>

<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
	<div class="flex grow flex-col">
		<Dropdown
			label="Region"
			options={[
				{ label: 'Aelio', value: NgsRunCategories.Aelio },
				{ label: 'Retem', value: NgsRunCategories.Retem },
				{ label: 'Kvaris', value: NgsRunCategories.Kvaris },
				{ label: 'Stia', value: NgsRunCategories.Stia },
			]}
			bind:value={region}
			on:change={applyFilters}
		/>
	</div>
	<div class="flex grow flex-col">
		<Dropdown label="Rank" options={regionSelections} bind:value={rank} on:change={applyFilters} />
	</div>
</div>
