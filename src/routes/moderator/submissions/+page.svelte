<script lang="ts">
	import { t } from 'svelte-i18n';
	import LeaderboardHeader from '$lib/LeaderboardHeader.svelte';
	import BackgroundRandomizer from '$lib/BackgroundRandomizer.svelte';
	import LeaderboardFooter from '$lib/LeaderboardFooter.svelte';
	import PurpleSoloSubmits from './Components/Purple/PurpleSoloSubmits.svelte';
	import PurplePartySubmits from './Components/Purple/PurplePartySubmits.svelte';
	import DfaSoloSubmits from './Components/Dfa/DfaSoloSubmits.svelte';
	import DfaPartySubmits from './Components/Dfa/DfaPartySubmits.svelte';
	import IndomitableSubmits from './Components/Indomitable/IndomitableSubmits.svelte';
	import Dropdown from '$lib/Components/Dropdown.svelte';

	const submissionCategoryOptions = [
		{ value: 'purple_solo', label: 'Purple Triggers - Solo' },
		{ value: 'purple_duo', label: 'Purple Triggers - Duo' },
		{ value: 'purple_party', label: 'Purple Triggers - Party' },
		{ value: 'dfa_solo', label: 'Dark Falz Aegis - Solo' },
		{ value: 'dfa_duo', label: 'Dark Falz Aegis - Duo' },
		{ value: 'dfa_party', label: 'Dark Falz Aegis - Party' },
		{ value: 'indomitable_nexaelio', label: 'Indomitable Nex Aelio' },
		{ value: 'indomitable_renusretem', label: 'Indomitable Renus Retem' },
		{ value: 'indomitable_amskvaris', label: 'Indomitable Ams Kvaris' },
		{ value: 'indomitable_nilsstia', label: 'Indomitable Nils Stia' }
	];

	const submitsMap: { [key: string]: { component: any; category?: string } } = {
		['purple_solo']: { component: PurpleSoloSubmits, category: 'purple_solo' },
		['purple_duo']: { component: PurplePartySubmits, category: 'purple_duo' },
		['purple_party']: { component: PurplePartySubmits, category: 'purple_party' },
		['dfa_solo']: { component: DfaSoloSubmits, category: 'dfa_solo' },
		['dfa_duo']: { component: DfaPartySubmits, category: 'dfa_duo' },
		['dfa_party']: { component: DfaPartySubmits, category: 'dfa_party' },
		['indomitable_nexaelio']: { component: IndomitableSubmits, category: 'indomitable_nexaelio' },
		['indomitable_renusretem']: {
			component: IndomitableSubmits,
			category: 'indomitable_renusretem'
		},
		['indomitable_amskvaris']: { component: IndomitableSubmits, category: 'indomitable_amskvaris' },
		['indomitable_nilsstia']: { component: IndomitableSubmits, category: 'indomitable_nilsstia' }
	};

	let selectedCategoryRuns = submissionCategoryOptions[0].value;

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
					<svelte:component this={tableComponent.component} category={tableComponent.category} />
				</div>
			</div>
		</div>
	</div>
	<LeaderboardFooter />
</div>

<BackgroundRandomizer />
