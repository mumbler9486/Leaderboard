<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import JumboButton from '$lib/Components/JumboButton.svelte';
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
			<Divider class="-mx-8" />

			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				<JumboButton
					label="Venogia"
					image="/icons/submit/venogia.jpg"
					link="/submit/venogia"
					overlayColor="neutral"
				/>
				<JumboButton
					label="Dark Falz Solus"
					image="/icons/submit/dfsolus.jpg"
					link="/submit/dfsolus"
					overlayColor="neutral"
				/>
				<JumboButton
					label="Duels"
					image="/icons/submit/duel_nils_stia.png"
					link="/submit/duels"
					overlayColor="red"
				/>
				<JumboButton
					label="Purples"
					image="/icons/submit/purple_trigger_gate.png"
					link="/submit/purples"
					overlayColor="purple"
				/>
				<JumboButton
					label="Dark Falz Aegis"
					image="/icons/submit/dfaegis.png"
					link="/submit/dfaegis"
					overlayColor="neutral"
				/>
			</div>
		</div>
	</div>
</div>
