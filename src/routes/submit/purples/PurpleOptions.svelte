<script lang="ts">
	import Select from '$lib/Components/Select.svelte';
	import RemainingTimeInput from '../RemainingTimeInput.svelte';
	import PartySizeOptions from '../PartySizeOptions.svelte';
	import CurrentPatchLabel from '../CurrentPatchLabel.svelte';
	import { purplesForm } from './submit';
	import { PurpleRegion } from '$lib/types/api/purpleRegions';

	let selectedRankStr: string = '1';

	const regionRankOptions: { [region: string]: number[] } = {
		[PurpleRegion.Aelio]: [1, 2, 3, 4],
		[PurpleRegion.Retem]: [1, 2, 3, 4],
		[PurpleRegion.Kvaris]: [1, 2],
		[PurpleRegion.Stia]: [1],
	};

	const rankOptionsDropdowns: { [region: number]: { label: string; value: string } } = {
		[1]: { label: '1', value: '1' },
		[2]: { label: '2', value: '2' },
		[3]: { label: '3', value: '3' },
		[4]: { label: '4', value: '4' },
	};

	$: rankOptions =
		regionRankOptions[$purplesForm.region]?.map((r) => rankOptionsDropdowns[r]) ?? [];

	$: $purplesForm.rank = parseInt(selectedRankStr);

	const regionChanged = () => {
		selectedRankStr = regionRankOptions[$purplesForm.region][0].toString();
		$purplesForm.rank = parseInt(selectedRankStr);
	};
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-4">
	<div class="md:col-span-3">
		<PartySizeOptions sizes={[1, 2, 4]} />
	</div>
	<CurrentPatchLabel />
</div>
<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
	<Select
		label="Region"
		placeholder="Select a region"
		options={[
			{ label: 'Aelio', value: PurpleRegion.Aelio },
			{ label: 'Retem', value: PurpleRegion.Retem },
			{ label: 'Kvaris', value: PurpleRegion.Kvaris },
			{ label: 'Stia', value: PurpleRegion.Stia },
		]}
		bind:value={$purplesForm.region}
		on:change={regionChanged}
	/>
	<Select
		label="Rank"
		placeholder="Select a rank"
		options={rankOptions}
		bind:value={selectedRankStr}
	/>
	<RemainingTimeInput limitMinutes={20} />
</div>
