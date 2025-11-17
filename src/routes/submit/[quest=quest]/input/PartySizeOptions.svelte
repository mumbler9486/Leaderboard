<script lang="ts">
	import { run } from 'svelte/legacy';

	import Select, { type SelectValues } from '$lib/Components/Select.svelte';
	import { PartySize } from '$lib/types/api/partySizes';
	import { partyForm } from '../forms/partyForm';

	interface Props {
		sizes: PartySize[];
	}

	let { sizes }: Props = $props();

	let selectedPartySize = $state($partyForm.length);

	const partySizes: Record<PartySize, SelectValues<number>> = {
		[PartySize.Solo]: { label: 'Solo (1 Player)', value: 1 },
		[PartySize.Duo]: { label: 'Duo (2 Players)', value: 2 },
		[PartySize.Party]: { label: 'Party (4 Players)', value: 4 },
		[PartySize.MultiParty]: { label: 'Full MPA (8 Players)', value: 8 },
	};

	let options = $derived(sizes.map((s) => partySizes[s]));
	run(() => {
		!!selectedPartySize ? partyForm.setPartySize(selectedPartySize) : partyForm.setPartySize(0);
	});

	export const reset = () => {
		selectedPartySize = partySizes[sizes[0]].value;
	};
</script>

<Select label="Party Size" {options} bind:value={selectedPartySize} />
