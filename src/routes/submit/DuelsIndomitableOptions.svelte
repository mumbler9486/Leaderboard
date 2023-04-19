<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import RunTimeInput from './RunTimeInput.svelte';
	import { indomitableForm } from './runStore';

	const bossOptions = [
		{ label: 'Nex Aelio', value: 'nexaelio' },
		{ label: 'Renus Retem', value: 'renusretem' },
		{ label: 'Ams Kvaris', value: 'amskvaris' },
		{ label: 'Nils Stia', value: 'nilsstia' }
	];

	const augmentOptions = [
		{ label: 'Yes, at least one', value: 'yes' },
		{ label: 'No, not at all', value: 'no' }
	];
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<div class="form-control">
		<Dropdown label="Boss" options={bossOptions} bind:value={$indomitableForm.boss} />
	</div>
	<div class="form-control">
		<Dropdown
			label="Defi Augments Used?"
			options={augmentOptions}
			bind:value={$indomitableForm.augments}
		/>
	</div>

	<div class="form-control">
		<div class="label justify-center">
			<span class="label-text text-center text-base font-semibold">Rank</span>
		</div>
		<input class="input-bordered input" value="1" type="text" disabled />
	</div>
	<div class="form-control">
		<RunTimeInput />
	</div>
</div>
