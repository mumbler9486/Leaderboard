<script lang="ts">
	import { t } from 'svelte-i18n';

	import DfAegisPartySubmits from './Components/DfAegis/DfAegisPartySubmits.svelte';
	import IndomitableSubmits from './Components/Indomitable/IndomitableSubmits.svelte';
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import SolusSubmits from './Components/DfSolus/DfSolusSubmits.svelte';
	import PurpleSubmits from './Components/Purple/PurpleSubmits.svelte';
	import { NgsQuests } from '$lib/types/api/runs/quests';

	const submissionCategoryOptions = [
		{ value: NgsQuests.Purples, label: 'Purple Triggers (all regions)' },
		{ value: NgsQuests.DfSolus, label: 'Dark Falz Solus' },
		{ value: NgsQuests.DfAegis, label: 'Dark Falz Aegis' },
		{ value: NgsQuests.Duels, label: 'Duels Indomitable' }
	];

	const submitsMap: { [key: string]: { component: any } } = {
		[NgsQuests.Purples]: { component: PurpleSubmits },
		[NgsQuests.DfAegis]: { component: DfAegisPartySubmits },
		[NgsQuests.Duels]: { component: IndomitableSubmits },
		[NgsQuests.DfSolus]: { component: SolusSubmits }
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
				<svelte:component this={tableComponent.component} />
			</div>
		</div>
	</div>
</div>
