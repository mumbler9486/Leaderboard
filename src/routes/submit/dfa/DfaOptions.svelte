<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import CurrentPatchLabel from '../CurrentPatchLabel.svelte';
	import PartySizeOptions from '../PartySizeOptions.svelte';
	import RunTimeInput from '../RunTimeInput.svelte';
	import { dfaForm } from '../runStore';

	let selectedRankStr: string = '1';

	const rankOptionsDropdowns: { [region: string]: { label: string; value: string }[] } = {
		['trigger']: [{ label: '1', value: '1' }],
		['urgent']: [{ label: '1', value: '1' }]
	};

	$: rankOptions = rankOptionsDropdowns[$dfaForm.type] ?? [];

	$: $dfaForm.rank = parseInt(selectedRankStr);

	const typeChanged = () => {
		selectedRankStr = rankOptionsDropdowns[$dfaForm.type][0].value;
		$dfaForm.rank = parseInt(selectedRankStr);
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
				{ label: 'Triggers / Drill', value: 'trigger' },
				{ label: 'Urgent Quest', value: 'urgent' }
			]}
			bind:value={$dfaForm.type}
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
				{ label: 'Aina & Manon', value: 'aina-manon' },
				{ label: 'Nadereh', value: 'nadereh' },
				{ label: 'Ilma', value: 'ilma' },
				{ label: 'Glen', value: 'glen' }
			]}
			bind:value={$dfaForm.support}
		/>
	</div>
	<div class="form-control">
		<RunTimeInput />
	</div>
</div>
