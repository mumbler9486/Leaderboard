<script lang="ts">
	import Select from '$lib/Components/Select.svelte';
	import { onMount } from 'svelte';
	import { partyForm } from '../partyFormStore';
	import CurrentPatchLabel from '../CurrentPatchLabel.svelte';
	import RunTimeInput from '../RunTimeInput.svelte';
	import { duelsForm } from './submit';
	import { IndomitableBoss } from '$lib/types/api/duels/indomitableBoss';
	import TextInput from '$lib/Components/TextInput.svelte';

	const bossOptions = [
		{ label: 'Nex Aelio', value: IndomitableBoss.NexAelio },
		{ label: 'Renus Retem', value: IndomitableBoss.RenusRetem },
		{ label: 'Ams Kvaris', value: IndomitableBoss.AmsKvaris },
		{ label: 'Nils Stia', value: IndomitableBoss.NilsStia },
		{ label: 'Halvaldi', value: IndomitableBoss.Halvaldi },
		{ label: 'Zelvin', value: IndomitableBoss.Zelvin },
		{ label: 'Ringwedge', value: IndomitableBoss.Ringwedge },
	];

	const augmentOptions = [
		{ label: 'Yes, at least one', value: 'yes' },
		{ label: 'No, not at all', value: 'no' },
	];

	onMount(() => partyForm.setPartySize(1));
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<div class="md:col-span-2">
		<Select label="Boss" options={bossOptions} bind:value={$duelsForm.boss} />
	</div>
	<div class="md:col-span-1">
		<TextInput prompt="Rank" disabled maxlength={10} value="1" />
	</div>
	<div class="md:col-span-1">
		<CurrentPatchLabel />
	</div>
</div>
<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<div class="md:col-span-3">
		<Select label="Defi Augments Used?" options={augmentOptions} bind:value={$duelsForm.augments} />
	</div>
	<RunTimeInput maxMinutes={10} />
</div>
