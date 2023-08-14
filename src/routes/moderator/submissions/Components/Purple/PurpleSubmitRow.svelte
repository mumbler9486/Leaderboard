<script lang="ts">
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import type { PurpleSubmission } from '$lib/types/api/submissions/submissions';
	import { createEventDispatcher } from 'svelte';
	import { mapPlayerInfoNamePref, mapToNamePref, mapToNamePref2 } from '$lib/types/api/mapNamePref';
	import { patchCodeLabelMap } from '$lib/constants/patchCodes';
	import { PurpleRegion } from '$lib/types/api/purpleRegions';
	import type { PurpleRun2 } from '$lib/types/api/runs/run';
	import WeaponIcon from '$lib/Components/WeaponIcon.svelte';

	const dispatcher = createEventDispatcher();

	export let submission: PurpleRun2;

	const regionCodes = {
		[PurpleRegion.Stia]: 'Stia',
		[PurpleRegion.Aelio]: 'Aelio',
		[PurpleRegion.Retem]: 'Retem',
		[PurpleRegion.Kvaris]: 'Kvaris'
	} as { [id: string]: string };

	let partySize = 'Solo';
	$: {
		const size = submission.party.length;
		if (size == 1) {
			partySize = 'Solo';
		}
		if (size == 2) {
			partySize = 'Duo';
		}
		if (size > 2) {
			partySize = 'Party';
		}
		if (size <= 0) {
			partySize = 'Invalid';
		}
	}

	const openModal = () => {
		dispatcher('openRunInfo', submission.runId);
	};
</script>

<tr class="hover border-t border-t-secondary/20">
	<td>
		{#each submission.party as player}
			<p>
				<PlayerNameBadge player={mapToNamePref2(player)} on:click={openModal} />
			</p>
		{/each}
	</td>
	<td class="text-center">{partySize}</td>
	<td class="text-center">
		{#each submission.party as player}
			<p>
				<NgsClassIcon showTooltip combatClass={player.mainClass} />
				<NgsClassIcon showTooltip combatClass={player.subClass} />
			</p>
		{/each}
	</td>
	<td class="text-center">
		{#if submission.party[0].weapons.length == 0}
			N/A
		{/if}
		{#each submission.party[0].weapons as weapon}
			<div class="inline w-[16px] object-none">
				<WeaponIcon {weapon} />
			</div>
		{/each}
	</td>
	<td class="text-center">{regionCodes[submission.category]}</td>
	<td class="text-center">{submission.questRank}</td>
	<td class="text-center">{patchCodeLabelMap[submission.patch.toLowerCase()]}</td>

	<td class="text-center">
		<TimeDisplay time={submission.time} />
	</td>
	<td class="text-center">
		<PlayerNameBadge player={mapPlayerInfoNamePref(submission.submitter)} on:click={openModal} />
	</td>
	<td class="text-center">
		{new Date(submission.submissionDate).toLocaleString()}
	</td>
	<td class="text-center">
		{#if submission.notes != undefined}
			<i class="bi bi-sticky" />
		{/if}
	</td>
</tr>
