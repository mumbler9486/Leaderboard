<script lang="ts">
	import RadioOptions from '$lib/Components/RadioOptions.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import { PartySize } from '$lib/types/api/partySizes';

	const validRankMap: Partial<Record<NgsRunCategories, number[]>> = {
		[NgsRunCategories.Aelio]: [1, 2, 3, 4],
		[NgsRunCategories.Retem]: [1, 2, 3, 4],
		[NgsRunCategories.Kvaris]: [1, 2],
		[NgsRunCategories.Stia]: [1],
		[NgsRunCategories.AelioIntruders]: [1, 2],
	};

	export let region: NgsRunCategories = NgsRunCategories.AelioIntruders;
	export let rank: string = '2';
	export let partySize: PartySize = PartySize.Solo;

	$: rankSelections = generateRegionSelections(validRankMap[region] ?? []);

	const generateRegionSelections = (ranks: number[]) => {
		if (ranks.length == 0) return [];
		const options = ranks.map((r) => ({ label: r.toString(), value: r.toString() }));
		rank = options[options.length - 1].value;
		return options;
	};

	$: regionSelections =
		partySize === PartySize.MultiParty && NgsRunCategories.AelioIntruders
			? [{ label: 'Aelio Intruders', value: NgsRunCategories.AelioIntruders }]
			: [
					{ label: 'Aelio', value: NgsRunCategories.Aelio },
					{ label: 'Retem', value: NgsRunCategories.Retem },
					{ label: 'Kvaris', value: NgsRunCategories.Kvaris },
					{ label: 'Stia', value: NgsRunCategories.Stia },
					{ label: 'Aelio Intruders', value: NgsRunCategories.AelioIntruders },
			  ];
</script>

<RadioOptions name="category" label="Region" bind:value={region} options={regionSelections} />
<RadioOptions name="rank" label="Rank" bind:value={rank} options={rankSelections} />
