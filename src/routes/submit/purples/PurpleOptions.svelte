<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import RemainingTimeInput from '../RemainingTimeInput.svelte';
	import PartySizeOptions from '../PartySizeOptions.svelte';
	import { purpleForm } from '../runStore';
	import RunTimeInput from '../RunTimeInput.svelte';
	import CurrentPatchLabel from '../CurrentPatchLabel.svelte';

	let selectedRankStr: string = '1';

	const regionRankOptions: { [region: string]: number[] } = {
		['aelio']: [1, 2, 3],
		['retem']: [1, 2, 3],
		['kvaris']: [1, 2],
		['stia']: [1]
	};

	const rankOptionsDropdowns: { [region: number]: any } = {
		[1]: { label: '1', value: '1' },
		[2]: { label: '2', value: '2' },
		[3]: { label: '3', value: '3' }
	};

	$: rankOptions = regionRankOptions[$purpleForm.region]?.map((r) => rankOptionsDropdowns[r]) ?? [];

	$: $purpleForm.rank = parseInt(selectedRankStr);

	const regionChanged = () => {
		selectedRankStr = regionRankOptions[$purpleForm.region][0].toString();
		$purpleForm.rank = parseInt(selectedRankStr);
	};
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<div class="form-control md:col-span-3">
		<PartySizeOptions sizes={[1, 2, 4]} />
	</div>
	<div class="form-control">
		<CurrentPatchLabel />
	</div>
</div>
<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
	<div class="form-control">
		<Dropdown
			label="Region"
			placeholder="Select a region"
			options={[
				{ label: 'Aelio', value: 'aelio' },
				{ label: 'Retem', value: 'retem' },
				{ label: 'Kvaris', value: 'kvaris' },
				{ label: 'Stia', value: 'stia' }
			]}
			bind:value={$purpleForm.region}
			on:change={regionChanged}
		/>
	</div>

	<div class="form-control">
		<Dropdown
			label="Rank"
			placeholder="Select a rank"
			options={rankOptions}
			bind:value={selectedRankStr}
		/>
	</div>
	<div class="form-control">
		<RemainingTimeInput limitMinutes={20} />
	</div>
</div>
