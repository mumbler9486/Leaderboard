<script lang="ts">
	import Select from '$lib/Components/Select.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import CurrentPatchLabel from '../CurrentPatchLabel.svelte';
	import PartySizeOptions from '../PartySizeOptions.svelte';
	import RemainingTimeInput from '../RemainingTimeInput.svelte';
	import { venogiaForm } from './submit';

	let selectedRankStr: string = '1';

	const rankOptionsDropdowns: { [region: string]: { label: string; value: string }[] } = {
		[NgsRunCategories.UrgentQuest]: [{ label: '1', value: '1' }],
	};

	$: rankOptions = rankOptionsDropdowns[$venogiaForm.category] ?? [];

	$: $venogiaForm.rank = parseInt(selectedRankStr);

	const typeChanged = () => {
		selectedRankStr = rankOptionsDropdowns[$venogiaForm.category][0].value;
		$venogiaForm.rank = parseInt(selectedRankStr);
	};
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<div class=" md:col-span-3">
		<PartySizeOptions sizes={[1, 2, 8]} />
	</div>
	<CurrentPatchLabel />
</div>
<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
	<Select
		label="Mode"
		placeholder="Select a mode"
		options={[{ label: 'Urgent Quest', value: NgsRunCategories.UrgentQuest }]}
		bind:value={$venogiaForm.category}
		on:change={typeChanged}
	/>
	<div class=" md:col-span-1">
		<Select
			label="Rank"
			placeholder="Select a rank"
			options={rankOptions}
			bind:value={selectedRankStr}
		/>
	</div>
	<RemainingTimeInput limitMinutes={30} />
</div>
