<script lang="ts">
	import Select from '$lib/Components/Select.svelte';
	import { partyForm } from '../partyForm';

	export let sizes: (1 | 2 | 4 | 8)[];

	let selectedPartySize: string = sizes[0].toString();

	const partySizes: { [key: number]: { label: string; value: string; disabled?: boolean } } = {
		[1]: { label: 'Solo (1 Player)', value: '1' },
		[2]: { label: 'Duo (2 Players)', value: '2' },
		[4]: { label: 'Party (4 Players)', value: '4' },
		[8]: { label: 'Full MPA (8 Players)', value: '8' },
	};

	$: options = sizes.map((s) => partySizes[s]);
	$: !!selectedPartySize && selectedPartySize != '0'
		? partyForm.setPartySize(parseInt(selectedPartySize))
		: partyForm.setPartySize(0);

	export const reset = () => {
		selectedPartySize = sizes[0].toString();
	};
</script>

<Select label="Party Size" {options} bind:value={selectedPartySize} />
