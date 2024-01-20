<script lang="ts">
	import Select from '$lib/Components/Select.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import { tick } from 'svelte';
	import CurrentPatchLabel from '../CurrentPatchLabel.svelte';
	import PartySizeOptions from '../PartySizeOptions.svelte';
	import RemainingTimeInput from '../RemainingTimeInput.svelte';
	import { partyForm } from '../partyFormStore';
	import { solusForm } from './submit';

	let partySizeInput: PartySizeOptions;
	let timeInput: RemainingTimeInput;

	let selectedRankStr: string = '1';

	const questOptions = [
		{ label: 'Quest', value: NgsRunCategories.Quest },
		{ label: 'Urgent Quest', value: NgsRunCategories.UrgentQuest },
	];

	const rankOptionsDropdowns: { [quest: string]: { label: string; value: string }[] } = {
		[NgsRunCategories.Quest]: [{ label: '1', value: '1' }],
		[NgsRunCategories.UrgentQuest]: [{ label: '1', value: '1' }],
	};

	const partySizeOptions: { [quest: string]: (1 | 2 | 4 | 8)[] } = {
		[NgsRunCategories.Quest]: [1, 2, 4],
		[NgsRunCategories.UrgentQuest]: [1, 2, 8],
	};

	$: rankOptions = rankOptionsDropdowns[$solusForm.category] ?? [];
	$: partyOptions = partySizeOptions[$solusForm.category] ?? [];
	$: maxMinutes = $solusForm.category === NgsRunCategories.Quest ? 15 : 60;

	$: $solusForm.rank = parseInt(selectedRankStr);

	const typeChanged = async () => {
		selectedRankStr = rankOptionsDropdowns[$solusForm.category][0].value;
		$solusForm.rank = parseInt(selectedRankStr);

		await tick();
		timeInput?.resetForm();
		partySizeInput.reset();
		partyForm.setPartySize(1);
	};
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<div class="md:col-span-3">
		<PartySizeOptions bind:this={partySizeInput} sizes={partyOptions} />
	</div>
	<CurrentPatchLabel />
</div>
<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
	<Select
		label="Mode"
		placeholder="Select a mode"
		options={questOptions}
		bind:value={$solusForm.category}
		on:change={typeChanged}
	/>
	<div class="md:col-span-1">
		<Select
			label="Rank"
			placeholder="Select a rank"
			options={rankOptions}
			bind:value={selectedRankStr}
		/>
	</div>
	<RemainingTimeInput bind:this={timeInput} limitMinutes={maxMinutes} />
</div>
