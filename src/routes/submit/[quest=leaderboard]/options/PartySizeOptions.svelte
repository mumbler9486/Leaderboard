<script lang="ts">
	import Select, { type SelectValues } from '$lib/Components/Select.svelte';
	import { PartySize } from '$lib/types/api/partySizes';
	import { partyForm } from '../forms/partyForm';

	export let sizes: PartySize[];

	let selectedPartySize = $partyForm.length;

	const partySizes: Record<PartySize, SelectValues<number>> = {
		[PartySize.Solo]: { label: 'Solo (1 Player)', value: 1 },
		[PartySize.Duo]: { label: 'Duo (2 Players)', value: 2 },
		[PartySize.Party]: { label: 'Party (4 Players)', value: 4 },
		[PartySize.MultiParty]: { label: 'Full MPA (8 Players)', value: 8 },
	};

	$: options = sizes.map((s) => partySizes[s]);
	$: !!selectedPartySize ? partyForm.setPartySize(selectedPartySize) : partyForm.setPartySize(0);

	export const reset = () => {
		selectedPartySize = partySizes[sizes[0]].value;
	};
</script>

<Select label="Party Size" {options} bind:value={selectedPartySize} />
