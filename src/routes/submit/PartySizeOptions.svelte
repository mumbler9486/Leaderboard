<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { runForm } from './runStore';

	export let sizes: (1 | 2 | 4 | 8)[];

	let selectedPartySize: string | undefined = undefined;

	const partySizes: { [key: number]: { label: string; value: string; disabled?: boolean } } = {
		[1]: { label: 'Solo (1 Player)', value: '1' },
		[2]: { label: 'Duo (2 Players)', value: '2' },
		[4]: { label: 'Party (4 Players)', value: '4' },
		[8]: { label: 'Full MPA (8 Players)', value: '8' }
	};

	runForm.subscribe((s) => {
		if (s.players.length == 0) {
			selectedPartySize = undefined;
		}
	});

	$: options = sizes.map((s) => partySizes[s]);
	$: $runForm.players =
		!!selectedPartySize && selectedPartySize != '0'
			? [...Array(parseInt(selectedPartySize)).keys()].map((p) => ({
					playerId: -1,
					povVideoLink: undefined,
					playerName: '',
					inVideoName: '',
					playerServer: '',
					mainClass: '',
					subClass: '',
					weapons: []
			  }))
			: [];
</script>

<Dropdown label="Party Size" {options} bind:value={selectedPartySize} />
