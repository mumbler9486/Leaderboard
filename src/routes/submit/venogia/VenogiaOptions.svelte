<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import CurrentPatchLabel from '../CurrentPatchLabel.svelte';
	import PartySizeOptions from '../PartySizeOptions.svelte';
	import RunTimeInput from '../RunTimeInput.svelte';
	import { venogiaForm } from './submit';

	let selectedRankStr: string = '1';

	const rankOptionsDropdowns: { [region: string]: { label: string; value: string }[] } = {
		['urgent_quest']: [{ label: '1', value: '1' }]
	};

	$: rankOptions = rankOptionsDropdowns[$venogiaForm.category] ?? [];

	$: $venogiaForm.rank = parseInt(selectedRankStr);

	const typeChanged = () => {
		selectedRankStr = rankOptionsDropdowns[$venogiaForm.category][0].value;
		$venogiaForm.rank = parseInt(selectedRankStr);
	};
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<div class="form-control md:col-span-3">
		<PartySizeOptions sizes={[1, 2, 8]} />
	</div>
	<div class="form-control">
		<CurrentPatchLabel />
	</div>
</div>
<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
	<div class="form-control">
		<Dropdown
			label="Mode"
			placeholder="Select a mode"
			options={[{ label: 'Urgent Quest', value: 'urgent_quest' }]}
			bind:value={$venogiaForm.category}
			on:change={typeChanged}
		/>
	</div>
	<div class="form-control md:col-span-1">
		<Dropdown
			label="Rank"
			placeholder="Select a rank"
			options={rankOptions}
			bind:value={selectedRankStr}
		/>
	</div>
	<div class="form-control">
		<RunTimeInput maxMinutes={60} />
	</div>
</div>
