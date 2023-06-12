<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import CurrentPatchLabel from '../CurrentPatchLabel.svelte';
	import PartySizeOptions from '../PartySizeOptions.svelte';
	import RemainingTimeInput from '../RemainingTimeInput.svelte';
	import { dfaForm } from '../runStore';
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
		<RemainingTimeInput limitMinutes={60} />
	</div>
</div>
