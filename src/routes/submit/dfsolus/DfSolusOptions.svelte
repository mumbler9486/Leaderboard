<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import CurrentPatchLabel from '../CurrentPatchLabel.svelte';
	import PartySizeOptions from '../PartySizeOptions.svelte';
	import RemainingTimeInput from '../RemainingTimeInput.svelte';
	import { solusForm } from './submit';

	let selectedRankStr: string = '1';

	const rankOptionsDropdowns: { [region: string]: { label: string; value: string }[] } = {
		[NgsRunCategories.Quest]: [{ label: '1', value: '1' }]
	};

	$: rankOptions = rankOptionsDropdowns[$solusForm.category] ?? [];

	$: $solusForm.rank = parseInt(selectedRankStr);

	const typeChanged = () => {
		selectedRankStr = rankOptionsDropdowns[$solusForm.category][0].value;
		$solusForm.rank = parseInt(selectedRankStr);
	};
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<div class="form-control md:col-span-3">
		<PartySizeOptions sizes={[1, 2, 4]} />
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
			options={[{ label: 'Quest', value: NgsRunCategories.Quest }]}
			bind:value={$solusForm.category}
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
		<RemainingTimeInput limitMinutes={15} />
	</div>
</div>
