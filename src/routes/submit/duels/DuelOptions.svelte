<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { onMount } from 'svelte';
	import { partyForm } from '../partyFormStore';
	import CurrentPatchLabel from '../CurrentPatchLabel.svelte';
	import RunTimeInput from '../RunTimeInput.svelte';
	import { duelsForm } from './submit';
	import { IndomitableBoss } from '$lib/types/api/duels/indomitableBoss';

	const bossOptions = [
		{ label: 'Nex Aelio', value: IndomitableBoss.NexAelio },
		{ label: 'Renus Retem', value: IndomitableBoss.RenusRetem },
		{ label: 'Ams Kvaris', value: IndomitableBoss.AmsKvaris },
		{ label: 'Nils Stia', value: IndomitableBoss.NilsStia },
		{ label: 'Halvaldi', value: IndomitableBoss.Halvaldi },
		{ label: 'Zelvin', value: IndomitableBoss.Zelvin },
	];

	const augmentOptions = [
		{ label: 'Yes, at least one', value: 'yes' },
		{ label: 'No, not at all', value: 'no' },
	];

	onMount(() => partyForm.setPartySize(1));
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<div class="form-control md:col-span-2">
		<Dropdown label="Boss" options={bossOptions} bind:value={$duelsForm.boss} />
	</div>
	<div class="form-control md:col-span-1">
		<div class="label justify-center">
			<span class="label-text text-center text-base font-semibold">Rank</span>
		</div>
		<input class="input input-bordered" value="1" type="text" disabled />
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
			bind:value={$duelsForm.augments}
		/>
	</div>
	<div class="form-control">
		<RunTimeInput maxMinutes={10} />
	</div>
</div>
