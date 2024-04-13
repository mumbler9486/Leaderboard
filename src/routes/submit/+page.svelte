<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import JumboButton from '$lib/Components/JumboButton.svelte';
	import { allLeaderboards } from '$lib/leaderboard/boards';
	import { t } from 'svelte-i18n';
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
				{#each allLeaderboards as board}
					<JumboButton
						label={$t(board.name)}
						image="/icons/submit/dfaegis.jpg"
						link={`/submit/${board.route}`}
						overlayColor="red"
						buttonLabel="Submit"
						badge={`New Boss`}
					/>
				{/each}
				<JumboButton
					label="Duels"
					image="/icons/submit/duel_nils_stia.jpg"
					link="/submit/duels"
					overlayColor="red"
					buttonLabel="Submit"
					badge="New Boss Ringwedge"
				/>
				<JumboButton
					label="Dark Falz Aegis"
					image="/icons/submit/dfaegis.jpg"
					link="/submit/dfaegis"
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
