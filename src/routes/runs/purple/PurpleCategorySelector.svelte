<script lang="ts">
	import RadioOptions from '$lib/Components/RadioOptions.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';

	export let region: NgsRunCategories = NgsRunCategories.AelioIntruders;
	export let rank: string = '2';

	const validRankMap: Partial<Record<NgsRunCategories, number[]>> = {
		[NgsRunCategories.Aelio]: [1, 2, 3, 4],
		[NgsRunCategories.Retem]: [1, 2, 3, 4],
		[NgsRunCategories.Kvaris]: [1, 2],
		[NgsRunCategories.Stia]: [1],
		[NgsRunCategories.AelioIntruders]: [1, 2],
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
		{ label: 'Aelio Intruders', value: NgsRunCategories.AelioIntruders },
	]}
/>
<RadioOptions name="rank" label="Rank" bind:value={rank} options={regionSelections} />
