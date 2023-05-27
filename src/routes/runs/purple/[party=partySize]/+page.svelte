<script lang="ts">
	import LeaderboardHeader from '$lib/LeaderboardHeader.svelte';
	import BackgroundRandomizer from '$lib/BackgroundRandomizer.svelte';
	import LeaderboardFooter from '$lib/LeaderboardFooter.svelte';
	import LeaderboardTitle from '$lib/LeaderboardComponents/Parts/LeaderboardTitle.svelte';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import PurpleSoloRunsTable from '../PurpleSoloRunsTable.svelte';
	import PurplePartyRunsTable from '../PurplePartyRunsTable.svelte';
	import PurpleSoloRunFilters from '../PurpleSoloRunFilters.svelte';
	import PurplePartyRunFilters from '../PurplePartyRunFilters.svelte';

	import { page } from '$app/stores';
	import { t } from 'svelte-i18n';
	import { fetchGetApi } from '$lib/utils/fetch';
	import {
		soloRunFilters,
		partyRunFilters,
		type PurplePartySearchFilters,
		type PurpleSoloSearchFilters
	} from '../purpleRunFilterStore';
	import { PartySize, parsePartySize } from '$lib/types/api/partySizes';
	import {
		copyQueryParams,
		useUrlFilterStore,
		type UrlQueryParamRule,
		clearFilterValues
	} from '$lib/utils/queryParams';
	import type { PurpleRun } from '$lib/types/api/purples/purples';
	import { onDestroy } from 'svelte';

	const partySizeMap: { [key: string]: string } = {
		[PartySize.Solo]: $t('common.playerCount.solo'),
		[PartySize.Duo]: $t('common.playerCount.duo'),
		[PartySize.Party]: $t('common.playerCount.party')
	};

	$: partySize = parsePartySize($page.params.party) ?? PartySize.Solo;
	$: pageTitle =
		partySize === PartySize.Solo
			? `${$t('shared.siteName')} | ${$t('leaderboard.purpleTriggers')} - ${$t(
					'common.playerCount.solo'
			  )}`
			: `${$t('shared.siteName')} | ${$t('leaderboard.purpleTriggers')} - ${$t(
					'common.playerCount.party'
			  )}`;
	$: partySizeTitle = partySizeMap[partySize];

	const soloFilterDef: UrlQueryParamRule<PurpleSoloSearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'class', undefinedValue: 'no_filter' },
		{ name: 'rank', defaultValue: '1' },
		{ name: 'region', defaultValue: 'stia' }
	];

	const partyFilterDef: UrlQueryParamRule<PurplePartySearchFilters>[] = [
		{ name: 'server', undefinedValue: 'no_filter' },
		{ name: 'rank', defaultValue: '1' },
		{ name: 'region', defaultValue: 'stia' }
	];

	const { cleanup: cleanupSolo, active: soloFiltersActive } = useUrlFilterStore(
		soloRunFilters,
		soloFilterDef
	);
	const { cleanup: cleanupParty, active: partyFiltersActive } = useUrlFilterStore(
		partyRunFilters,
		partyFilterDef
	);

	$: setActiveUrlStore(partySize);
	const setActiveUrlStore = (partySize: PartySize) => {
		if (partySize == PartySize.Solo) {
			$soloFiltersActive = true;
			$partyFiltersActive = false;
		} else {
			$soloFiltersActive = false;
			$partyFiltersActive = true;
		}
	};

	const fetchRuns = async (...watch: any[]) => {
		const basePath = `/ngs-api/runs/purples/${partySize}`;
		const runFilters =
			partySize === PartySize.Solo
				? clearFilterValues($soloRunFilters, soloFilterDef)
				: clearFilterValues($partyRunFilters, partyFilterDef);

		return (await fetchGetApi<PurpleRun[]>(basePath, copyQueryParams(runFilters))) ?? [];
	};

	onDestroy(() => {
		cleanupSolo();
		cleanupParty();
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="flex min-h-screen flex-col">
	<LeaderboardHeader />

	<LeaderboardTitle category={$t('leaderboard.purpleTriggers')} subCategory={partySizeTitle} />

	<div class="grow content-center">
		<div class="container mx-auto mb-16 mt-2 rounded-md border border-secondary bg-base-100/75">
			<div class="m-2 space-y-2 rounded-md border border-secondary bg-base-100 p-4 px-8">
				{#if partySize === PartySize.Solo}
					<PurpleSoloRunFilters />
				{:else}
					<PurplePartyRunFilters />
				{/if}
				{#await fetchRuns($page, $soloRunFilters, $partyRunFilters)}
					<LoadingBar />
				{:then runs}
					{#if partySize === PartySize.Solo}
						<PurpleSoloRunsTable {runs} />
					{:else}
						<PurplePartyRunsTable {runs} />
					{/if}
				{:catch err}
					<p>An error has occured, please try again later</p>
				{/await}
			</div>
		</div>
	</div>

	<LeaderboardFooter />
</div>

<BackgroundRandomizer />
