<script lang="ts">
	import RadioOptions from '$lib/Components/RadioOptions.svelte';
	import { PartySize } from '$lib/types/api/partySizes';
	import { runFilters } from '../../../runFilter';

	export let allowedPartySizes: PartySize[] = [];

	const partySizeOptions = [
		{
			label: 'Solo',
			value: PartySize.Solo,
		},
		{
			label: 'Duo',
			value: PartySize.Duo,
		},
		{
			label: 'Party (4p)',
			value: PartySize.Party,
		},
		{
			label: 'Multi-Party',
			value: PartySize.MultiParty,
		},
	];
	$: selectablePartySizes = partySizeOptions.filter((c) => allowedPartySizes.includes(c.value));
</script>

<RadioOptions name="partySize" options={selectablePartySizes} bind:value={$runFilters.partySize} />
