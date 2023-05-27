<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let region: string = 'stia';
	export let rank: string = '1';

	const validRankMap: { [region: string]: number[] } = {
		aelio: [1, 2, 3],
		retem: [1, 2, 3],
		kvaris: [1, 2],
		stia: [1]
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
			rank: rank
		});
	};
</script>

<div class="flex flex-row flex-wrap place-content-center items-stretch gap-2">
	<div class="flex grow flex-col">
		<Dropdown
			label="Region"
			options={[
				{ label: 'Aelio', value: 'aelio' },
				{ label: 'Retem', value: 'retem' },
				{ label: 'Kvaris', value: 'kvaris' },
				{ label: 'Stia', value: 'stia' }
			]}
			bind:value={region}
			on:change={applyFilters}
		/>
	</div>
	<div class="flex grow flex-col">
		<Dropdown label="Rank" options={regionSelections} bind:value={rank} on:change={applyFilters} />
	</div>
</div>
