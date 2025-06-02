<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import JumboButton from '$lib/Components/JumboButton.svelte';
	import { allLeaderboards } from '$lib/leaderboard/boards';
	import type { LeaderboardDefinition } from '$lib/leaderboard/leaderboard';
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import { t } from 'svelte-i18n';

	$: leaderboards = Object.values(
		allLeaderboards.reduce(
			(prev, curr) => {
				prev[curr.questRoute] = curr;
				return prev;
			},
			{} as Record<string, LeaderboardDefinition<any, any>>
		)
	);
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | Submit a Run</title>
</svelte:head>

<div class="flex grow flex-col content-center">
	<div class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
		<div
			class="m-2 flex grow flex-col gap-1 rounded-md border border-secondary bg-base-100 p-4 px-8"
		>
			<div class="text-center text-4xl font-light">Submit a Run</div>
			<Divider />

			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				<JumboButton
					label="Dark Falz Vael"
					image="/icons/submit/dfvael.jpg"
					link="/submit/dfvael"
					overlayColor="blue"
					badge="New Standing Quest Ver."
					buttonLabel="Submit"
				/>
				<JumboButton
					label="Ruine Masquerade Extra Duel"
					image="/icons/submit/extra_duel_masq.jpg"
					link="/submit/extra-duels"
					overlayColor="neutral"
					buttonLabel="Submit"
				/>
				{#each leaderboards.filter((b) => b.quest === NgsQuests.DfDalion) as board}
					<JumboButton
						label={$t(board.name)}
						image={board.icon}
						link={`/submit/${board.questRoute}`}
						overlayColor="neutral"
						buttonLabel="Submit"
					/>
				{/each}
				<JumboButton
					label="Duels"
					image="/icons/submit/ringwedge.jpg"
					link="/submit/duels"
					overlayColor="neutral"
					buttonLabel="Submit"
				/>
				<JumboButton
					label="Purples"
					image="/icons/submit/purple_trigger_gate.jpg"
					link="/submit/purples"
					overlayColor="purple"
					buttonLabel="Submit"
				/>
				<!-- TODO Temporary for ordering the boards in a particular order in new board format  -->
				{#each leaderboards.filter((b) => b.quest === NgsQuests.DfAegis) as board}
					<JumboButton
						label={$t(board.name)}
						image={board.icon}
						link={`/submit/${board.questRoute}`}
						overlayColor="neutral"
						buttonLabel="Submit"
					/>
				{/each}
				<JumboButton
					label="Dark Falz Solus"
					image="/icons/submit/dfsolus.jpg"
					link="/submit/dfsolus"
					overlayColor="neutral"
					buttonLabel="Submit"
				/>
				<JumboButton
					label="Venogia"
					image="/icons/submit/venogia.jpg"
					link="/submit/venogia"
					overlayColor="neutral"
					buttonLabel="Submit"
				/>
			</div>
		</div>
	</div>
</div>
