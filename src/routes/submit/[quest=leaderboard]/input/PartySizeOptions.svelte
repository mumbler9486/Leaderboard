<script lang="ts">
	import Select from '$lib/Components/Select.svelte';
	import { partyForm } from '../forms/partyForm';

	export let sizes: (1 | 2 | 4 | 8)[];

	let selectedPartySize: number = sizes[0] ?? 1;

	const partySizes: Record<number, { label: string; value: number; disabled?: boolean }> = {
		[1]: { label: 'Solo (1 Player)', value: 1 },
		[2]: { label: 'Duo (2 Players)', value: 2 },
		[4]: { label: 'Party (4 Players)', value: 4 },
		[8]: { label: 'Full MPA (8 Players)', value: 8 },
	};

	$: options = sizes.map((s) => partySizes[s]);
	$: !!selectedPartySize && selectedPartySize != 0
		? partyForm.setPartySize(selectedPartySize)
		: partyForm.setPartySize(1);

	export const reset = () => {
		selectedPartySize = sizes[0];
	};
</script>

<Select label="Party Size" {options} bind:value={selectedPartySize} />
