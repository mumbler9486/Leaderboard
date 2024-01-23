<script lang="ts">
	import RadioOptions from '$lib/Components/RadioOptions.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import { createEventDispatcher } from 'svelte';

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
</script>

<RadioOptions
	name="category"
	label="Region"
	bind:value={region}
	options={[
		{ label: 'Aelio', value: NgsRunCategories.Aelio },
		{ label: 'Retem', value: NgsRunCategories.Retem },
		{ label: 'Kvaris', value: NgsRunCategories.Kvaris },
		{ label: 'Stia', value: NgsRunCategories.Stia },
	]}
/>
<RadioOptions name="rank" label="Rank" bind:value={rank} options={regionSelections} />
