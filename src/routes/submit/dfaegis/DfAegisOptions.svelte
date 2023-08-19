<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { DfAegisSupport } from '$lib/types/api/dfAegis/dfAegisSupports';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import CurrentPatchLabel from '../CurrentPatchLabel.svelte';
	import PartySizeOptions from '../PartySizeOptions.svelte';
	import RunTimeInput from '../RunTimeInput.svelte';
	import { dfAegisForm } from './submit';

	let selectedRankStr: string = '1';

	const rankOptionsDropdowns: { [region: string]: { label: string; value: string }[] } = {
		[NgsRunCategories.Trigger]: [{ label: '1', value: '1' }],
		[NgsRunCategories.UrgentQuest]: [{ label: '1', value: '1' }]
	};

	$: rankOptions = rankOptionsDropdowns[$dfAegisForm.category] ?? [];

	$: $dfAegisForm.rank = parseInt(selectedRankStr);

	const typeChanged = () => {
		selectedRankStr = rankOptionsDropdowns[$dfAegisForm.category][0].value;
		$dfAegisForm.rank = parseInt(selectedRankStr);
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
<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<div class="form-control">
		<Dropdown
			label="Mode"
			placeholder="Select a mode"
			options={[
				{ label: 'Triggers / Drill', value: NgsRunCategories.Trigger },
				{ label: 'Urgent Quest', value: NgsRunCategories.UrgentQuest }
			]}
			bind:value={$dfAegisForm.category}
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
		<Dropdown
			label="Support"
			placeholder="Select a support"
			options={[
				{ label: 'Aina & Manon', value: DfAegisSupport.AinaManon },
				{ label: 'Nadereh', value: DfAegisSupport.Nadereh },
				{ label: 'Ilma', value: DfAegisSupport.Ilma },
				{ label: 'Glen', value: DfAegisSupport.Glen }
			]}
			bind:value={$dfAegisForm.support}
		/>
	</div>
	<div class="form-control">
		<RunTimeInput />
	</div>
</div>
