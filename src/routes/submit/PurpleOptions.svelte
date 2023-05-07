<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import PartySizeOptions from './PartySizeOptions.svelte';
	import RunTimeInput from './RunTimeInput.svelte';
	import { purpleForm, runForm } from './runStore';

	let selectedPartySize: string = '1';
	let selectedMode: string = 'trigger';
	let selectedRankStr: string = '1';
	let runTime: any;

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
	};
</script>

<div class="form-control">
	<PartySizeOptions sizes={[1, 2, 4]} />
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
		<RunTimeInput />
	</div>
</div>
