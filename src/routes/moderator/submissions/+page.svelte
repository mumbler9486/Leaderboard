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
	import { RunCategories } from '$lib/types/api/categories';

	const submissionCategoryOptions = [
		{ value: RunCategories.PurpleSolo, label: 'Purple Triggers - Solo' },
		{ value: RunCategories.PurpleDuo, label: 'Purple Triggers - Duo' },
		{ value: RunCategories.PurpleParty, label: 'Purple Triggers - Party' },
		{ value: RunCategories.DfaSolo, label: 'Dark Falz Aegis - Solo' },
		{ value: RunCategories.DfaDuo, label: 'Dark Falz Aegis - Duo' },
		{ value: RunCategories.DfaParty, label: 'Dark Falz Aegis - Party' },
		{ value: RunCategories.IndomitableNexAelio, label: 'Indomitable Nex Aelio' },
		{ value: RunCategories.IndomitableRenusRetem, label: 'Indomitable Renus Retem' },
		{ value: RunCategories.IndomitableAmsKvaris, label: 'Indomitable Ams Kvaris' },
		{ value: RunCategories.IndomitableNilsStia, label: 'Indomitable Nils Stia' }
	];

	const submitsMap: { [key: string]: { component: any; category: RunCategories } } = {
		[RunCategories.PurpleSolo]: {
			component: PurpleSoloSubmits,
			category: RunCategories.PurpleSolo
		},
		[RunCategories.PurpleDuo]: { component: PurplePartySubmits, category: RunCategories.PurpleDuo },
		[RunCategories.PurpleParty]: {
			component: PurplePartySubmits,
			category: RunCategories.PurpleParty
		},
		[RunCategories.DfaSolo]: { component: DfaSoloSubmits, category: RunCategories.DfaSolo },
		[RunCategories.DfaDuo]: { component: DfaPartySubmits, category: RunCategories.DfaDuo },
		[RunCategories.DfaParty]: { component: DfaPartySubmits, category: RunCategories.DfaParty },
		[RunCategories.IndomitableNexAelio]: {
			component: IndomitableSubmits,
			category: RunCategories.IndomitableNexAelio
		},
		[RunCategories.IndomitableRenusRetem]: {
			component: IndomitableSubmits,
			category: RunCategories.IndomitableRenusRetem
		},
		[RunCategories.IndomitableAmsKvaris]: {
			component: IndomitableSubmits,
			category: RunCategories.IndomitableAmsKvaris
		},
		[RunCategories.IndomitableNilsStia]: {
			component: IndomitableSubmits,
			category: RunCategories.IndomitableNilsStia
		}
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
