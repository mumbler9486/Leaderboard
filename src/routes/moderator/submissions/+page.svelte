<script lang="ts">
	import { t } from 'svelte-i18n';

	import DfaPartySubmits from './Components/Dfa/DfaPartySubmits.svelte';
	import IndomitableSubmits from './Components/Indomitable/IndomitableSubmits.svelte';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import SolusSubmits from './Components/DfSolus/DfSolusSubmits.svelte';
	import PurpleSubmits from './Components/Purple/PurpleSubmits.svelte';

	const submissionCategoryOptions = [
		{ value: 'purples', label: 'Purple Triggers (all regions)' },
		{ value: 'dfsolus', label: 'Dark Falz Solus' },
		{ value: 'dfaegis', label: 'Dark Falz Aegis' },
		{ value: 'duels', label: 'Duels Indomitable' }
	];

	const submitsMap: { [key: string]: { component: any; category: string } } = {
		['purples']: {
			component: PurpleSubmits,
			category: 'purples'
		},
		['dfaegis']: { component: DfaPartySubmits, category: 'dfaegis' },
		['duels']: {
			component: IndomitableSubmits,
			category: 'duels'
		},
		['dfsolus']: {
			component: SolusSubmits,
			category: 'dfsolus'
		}
	};

	let selectedCategoryRuns = submissionCategoryOptions[0].value;

	$: tableComponent = submitsMap[selectedCategoryRuns];
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | Moderation - Submission Queue</title>
</svelte:head>

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
