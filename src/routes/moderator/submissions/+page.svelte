<script lang="ts">
	import { t } from 'svelte-i18n';
	import LeaderboardHeader from '$lib/LeaderboardHeader.svelte';
	import BackgroundRandomizer from '$lib/BackgroundRandomizer.svelte';
	import LeaderboardFooter from '$lib/LeaderboardFooter.svelte';
	import SubmitsSoloPurple from './Components/SoloPurple/SubmitsSolo.svelte';
	import SubmitsSoloAegis from './Components/SoloDFA/SubmitsSolo.svelte';
	import SubmitsDuoAegis from './Components/DuoDFA/SubmitsParty.svelte';
	import SubmitsDuoPurple from './Components/DuoPurple/SubmitsParty.svelte';
	import SubmitsPartyPurple from './Components/PartyPurple/SubmitsParty.svelte';
	import SubmitsPartyAegis from './Components/PartyDFA/SubmitsParty.svelte';
	import SubmitsIndomitable from './Components/Indomitable/SubmitsSolo.svelte';
	import Dropdown from '$lib/Components/Dropdown.svelte';

	let selectedCategoryRuns = 'purplesolo';

	const submissionCategoryOptions = [
		{ value: 'purplesolo', label: 'Purple Triggers - Solo' },
		{ value: 'purpleduo', label: 'Purple Triggers - Duo' },
		{ value: 'purpleparty', label: 'Purple Triggers - Party' },
		{ value: 'aegissolo', label: 'Dark Falz Aegis - Solo' },
		{ value: 'aegisduo', label: 'Dark Falz Aegis - Duo' },
		{ value: 'aegisparty', label: 'Dark Falz Aegis - Party' },
		{ value: 'indomitable_nexaelio', label: 'Indomitable Nex Aelio' },
		{ value: 'indomitable_renusretem', label: 'Indomitable Renus Retem' },
		{ value: 'indomitable_amskvaris', label: 'Indomitable Ams Kvaris' },
		{ value: 'indomitable_nilsstia', label: 'Indomitable Nils Stia' }
	];

	const submitsMap: { [key: string]: { component: any; boss?: string } } = {
		['purplesolo']: { component: SubmitsSoloPurple },
		['purpleduo']: { component: SubmitsDuoPurple },
		['purpleparty']: { component: SubmitsPartyPurple },
		['aegissolo']: { component: SubmitsSoloAegis },
		['aegisduo']: { component: SubmitsDuoAegis },
		['aegisparty']: { component: SubmitsPartyAegis },
		['indomitable_nexaelio']: { component: SubmitsIndomitable, boss: 'nexaelio' },
		['indomitable_renusretem']: { component: SubmitsIndomitable, boss: 'renusretem' },
		['indomitable_amskvaris']: { component: SubmitsIndomitable, boss: 'amskvaris' },
		['indomitable_nilsstia']: { component: SubmitsIndomitable, boss: 'nilsstia' }
	};

	$: tableComponent = submitsMap[selectedCategoryRuns];
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | Moderation - Submission Queue</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<LeaderboardHeader />

	<div class="flex grow flex-col content-center">
		<div class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
			<div
				class="m-0 flex w-screen grow flex-col gap-1 rounded-md border border-secondary bg-base-100 p-4 px-8 md:m-2"
			>
				<div class="text-center text-4xl font-light">Submission Queue</div>
				<div class="divider -mx-8" />
				<div class="m-0 gap-1 rounded-md border border-secondary bg-secondary/10 p-4 px-8 md:m-2">
					<div class="flex flex-col gap-2 md:flex-row">
						<div class="form-control grow">
							<Dropdown
								label="Run Category"
								options={submissionCategoryOptions}
								bind:value={selectedCategoryRuns}
							/>
						</div>
					</div>
				</div>

				<div
					class="m-0 grow space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8 md:m-2"
				>
					<svelte:component this={tableComponent.component} boss={tableComponent.boss} />
				</div>
			</div>
		</div>
	</div>
	<LeaderboardFooter />
</div>

<BackgroundRandomizer />
