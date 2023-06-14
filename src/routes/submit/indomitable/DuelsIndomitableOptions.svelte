<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { RunCategories } from '$lib/types/api/categories';
	import { onMount } from 'svelte';
	import { indomitableForm } from '../runStore';
	import { partyForm } from '../partyFormStore';
	import CurrentPatchLabel from '../CurrentPatchLabel.svelte';
	import RunTimeInput from '../RunTimeInput.svelte';

	const bossOptions = [
		{ label: 'Nex Aelio', value: RunCategories.IndomitableNexAelio },
		{ label: 'Renus Retem', value: RunCategories.IndomitableRenusRetem },
		{ label: 'Ams Kvaris', value: RunCategories.IndomitableAmsKvaris },
		{ label: 'Nils Stia', value: RunCategories.IndomitableNilsStia }
	];

	const augmentOptions = [
		{ label: 'Yes, at least one', value: 'yes' },
		{ label: 'No, not at all', value: 'no' }
	];

	onMount(() => partyForm.setPartySize(1));
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<div class="form-control md:col-span-2">
		<Dropdown label="Boss" options={bossOptions} bind:value={$indomitableForm.boss} />
	</div>
	<div class="form-control md:col-span-1">
		<div class="label justify-center">
			<span class="label-text text-center text-base font-semibold">Rank</span>
		</div>
		<input class="input-bordered input" value="1" type="text" disabled />
	</div>
	<div class="form-control md:col-span-1">
		<CurrentPatchLabel />
	</div>
</div>
<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<div class="form-control md:col-span-3">
		<Dropdown
			label="Defi Augments Used?"
			options={augmentOptions}
			bind:value={$indomitableForm.augments}
		/>
	</div>
	<div class="form-control">
		<RunTimeInput />
	</div>
</div>
