<script lang="ts">
	import Select from '$lib/Components/Select.svelte';
	import { DfAegisSupport } from '$lib/types/api/dfAegis/dfAegisSupports';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import { dfAegisRunForm } from '../forms/dfAegisForm';
	import { questForm } from '../forms/questForm';

	$: {
		if ($questForm.category === NgsRunCategories.Quest) {
			$dfAegisRunForm.support = DfAegisSupport.None;
		} else {
			$dfAegisRunForm.support = DfAegisSupport.AinaManon;
		}
	}
	$: supportOptions = supportOptionsDropdowns[$questForm.category] ?? [];

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
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<Select
		label="Support"
		placeholder="Select a support"
		options={supportOptions}
		disabled={$questForm.category === NgsRunCategories.Quest}
		bind:value={$dfAegisRunForm.support}
	/>
</div>
