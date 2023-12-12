<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { DfAegisSupport } from '$lib/types/api/dfAegis/dfAegisSupports';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import { tick } from 'svelte';
	import CurrentPatchLabel from '../CurrentPatchLabel.svelte';
	import PartySizeOptions from '../PartySizeOptions.svelte';
	import RunTimeInput from '../RunTimeInput.svelte';
	import { dfAegisForm } from './submit';
	import { partyForm } from '../partyFormStore';

	let partySizeInput: PartySizeOptions;
	let timeInput: RunTimeInput;

	let selectedRankStr: string = '1';

	const rankOptionsDropdowns: Record<string, { label: string; value: string }[]> = {
		[NgsRunCategories.Quest]: [{ label: '1', value: '1' }],
		[NgsRunCategories.Trigger]: [{ label: '1', value: '1' }],
		[NgsRunCategories.UrgentQuest]: [{ label: '1', value: '1' }],
	};
	const partySizeOptions: Record<string, (1 | 2 | 4 | 8)[]> = {
		[NgsRunCategories.Quest]: [1, 2, 4],
		[NgsRunCategories.Trigger]: [1, 2, 8],
		[NgsRunCategories.UrgentQuest]: [1, 2, 8],
	};

	const supportOptionsDropdowns: Record<string, { label: string; value: string }[]> = {
		[NgsRunCategories.Quest]: [{ label: 'N/A', value: DfAegisSupport.None }],
		[NgsRunCategories.Trigger]: [
			{ label: 'Aina & Manon', value: DfAegisSupport.AinaManon },
			{ label: 'Nadereh', value: DfAegisSupport.Nadereh },
			{ label: 'Ilma', value: DfAegisSupport.Ilma },
			{ label: 'Glen', value: DfAegisSupport.Glen },
		],
		[NgsRunCategories.UrgentQuest]: [
			{ label: 'Aina & Manon', value: DfAegisSupport.AinaManon },
			{ label: 'Nadereh', value: DfAegisSupport.Nadereh },
			{ label: 'Ilma', value: DfAegisSupport.Ilma },
			{ label: 'Glen', value: DfAegisSupport.Glen },
		],
	};

	$: rankOptions = rankOptionsDropdowns[$dfAegisForm.category] ?? [];
	$: partyOptions = partySizeOptions[$dfAegisForm.category] ?? [];
	$: supportOptions = supportOptionsDropdowns[$dfAegisForm.category] ?? [];

	$: $dfAegisForm.rank = parseInt(selectedRankStr);

	const typeChanged = async () => {
		selectedRankStr = rankOptionsDropdowns[$dfAegisForm.category][0].value;
		$dfAegisForm.rank = parseInt(selectedRankStr);

		if ($dfAegisForm.category === NgsRunCategories.Quest) {
			$dfAegisForm.support = DfAegisSupport.None;
		} else {
			$dfAegisForm.support = DfAegisSupport.AinaManon;
		}

		await tick();
		timeInput?.resetForm();
		partySizeInput.reset();
		partyForm.setPartySize(1);
	};
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<div class="form-control md:col-span-3">
		<PartySizeOptions bind:this={partySizeInput} sizes={partyOptions} />
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
				{ label: 'Quest', value: NgsRunCategories.Quest },
				{ label: 'Triggers / Drill', value: NgsRunCategories.Trigger },
				{ label: 'Urgent Quest', value: NgsRunCategories.UrgentQuest },
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
			options={supportOptions}
			disabled={$dfAegisForm.category === NgsRunCategories.Quest}
			bind:value={$dfAegisForm.support}
		/>
	</div>
	<div class="form-control">
		<RunTimeInput maxMinutes={15} bind:this={timeInput} />
	</div>
</div>
