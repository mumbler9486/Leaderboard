<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import PartySizeOptions from '../PartySizeOptions.svelte';
	import RunTimeInput from '../RunTimeInput.svelte';
	import { dfaForm } from '../runStore';
</script>

<div class="form-control">
	<PartySizeOptions sizes={[1, 2, 8]} />
</div>
<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
	<div class="form-control">
		<Dropdown
			label="Mode"
			placeholder="Select a mode"
			options={[
				{ label: 'Triggers / Drill', value: 'trigger' },
				{ label: 'Urgent Quest', value: 'urgent' }
			]}
			bind:value={$dfaForm.type}
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
