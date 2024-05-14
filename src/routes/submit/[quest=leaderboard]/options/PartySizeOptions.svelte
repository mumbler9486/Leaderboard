<script lang="ts">
	import Select, { type SelectValues } from '$lib/Components/Select.svelte';
	import { PartySize } from '$lib/types/api/partySizes';
	import { partyForm } from '../partyForm';

	export let sizes: PartySize[];

	let selectedPartySize = sizes[0];

	const partySizes: Record<PartySize, SelectValues<PartySize>> = {
		[PartySize.Solo]: { label: 'Solo (1 Player)', value: PartySize.Solo },
		[PartySize.Duo]: { label: 'Duo (2 Players)', value: PartySize.Duo },
		[PartySize.Party]: { label: 'Party (4 Players)', value: PartySize.Party },
		[PartySize.MultiParty]: { label: 'Full MPA (8 Players)', value: PartySize.MultiParty },
	};

	const partySizeMap: Record<PartySize, number> = {
		[PartySize.Solo]: 1,
		[PartySize.Duo]: 2,
		[PartySize.Party]: 4,
		[PartySize.MultiParty]: 8,
	};

	$: options = sizes.map((s) => partySizes[s]);
	$: !!selectedPartySize
		? partyForm.setPartySize(partySizeMap[selectedPartySize])
		: partyForm.setPartySize(0);

	export const reset = () => {
		selectedPartySize = sizes[0];
	};
</script>

<Select label="Party Size" {options} bind:value={selectedPartySize} />
