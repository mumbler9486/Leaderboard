<script lang="ts">
	import { t } from 'svelte-i18n';
	import PlayerNameBadge from '$lib/Components/PlayerNameBadge.svelte';
	import NgsClassIcon from '$lib/Components/NgsClassIcon.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import { mapPartyMemberToNamePref } from '$lib/types/api/mapNamePref';
	import LoadingBar from '$lib/Components/LoadingBar.svelte';
	import { fetchGetApi } from '$lib/utils/fetch';
	import { copyQueryParams } from '$lib/utils/queryParams';
	import type { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
	import type { RunTime } from '$lib/types/api/runTime';
	import type { PartyMember, Run } from '$lib/types/api/runs/run';
	import type { RunsSearchFilter } from '$lib/types/api/validation/runsSearchFilter';
	import { RunSortOption } from '$lib/types/api/runs/sortOptions';
	import { NgsQuests } from '$lib/types/api/runs/quests';
	import { NgsRunCategories } from '$lib/types/api/runs/categories';
	import Divider from '$lib/Components/Divider.svelte';

	const take = 10;

	interface RecentRun {
		mainClass: NgsPlayerClass;
		partyMember: PartyMember | undefined;
		time: RunTime;
		category: string;
		approvalDate: Date;
	}

	const questNameMap: Record<string, Record<string, string>> = {
		[NgsQuests.Purples]: {
			[NgsRunCategories.Aelio]: 'Purple Aelio R.',
			[NgsRunCategories.Retem]: 'Purple Retem R.',
			[NgsRunCategories.Kvaris]: 'Purple Kvaris R.',
			[NgsRunCategories.Stia]: 'Purple Stia R.',
		},
		[NgsQuests.DfAegis]: {
			[NgsRunCategories.UrgentQuest]: 'DF Aegis UQ R.',
			[NgsRunCategories.Quest]: 'DF Aegis R.',
			[NgsRunCategories.Trigger]: 'DF Aegis Trig R.',
		},
		[NgsQuests.DfSolus]: {
			[NgsRunCategories.Quest]: 'DF Solus R.',
			[NgsRunCategories.UrgentQuest]: 'DF Solus UQ R.',
		},
		[NgsQuests.Duels]: {
			[NgsRunCategories.NexAelio]: 'Duel Nex Aelio R.',
			[NgsRunCategories.RenusRetem]: 'Duel Renus Retem R.',
			[NgsRunCategories.AmsKvaris]: 'Duel Ams Kvaris R.',
			[NgsRunCategories.NilsStia]: 'Duel Nils Stia R.',
			[NgsRunCategories.Halvaldi]: 'Duel Halvaldi R.',
			[NgsRunCategories.Zelvin]: 'Duel Zelvin R.',
		},
		[NgsQuests.Venogia]: {
			[NgsRunCategories.UrgentQuest]: 'Venogia R.',
		},
	};

	const fetchRuns = async () => {
		const runsSearchFilter: RunsSearchFilter = {
			page: 0,
			take: take,
			partySize: 1,
			sort: RunSortOption.Recent,
		};
		const runsPath = '/ngs-api/runs';
		const soloRuns = (await fetchGetApi<Run[]>(runsPath, copyQueryParams(runsSearchFilter))) ?? [];

		const recentSolos = soloRuns
			.map(
				(r) =>
					({
						category: `${questNameMap[r.quest][r.category] ?? '<unknown_quest>'}${r.questRank}`,
						mainClass: r.party[0]?.mainClass,
						time: r.time,
						partyMember: r.party[0],
						approvalDate: new Date(r.dateReviewed!),
					}) satisfies RecentRun
			)
			.sort((a, b) => (a.approvalDate < b.approvalDate ? 1 : -1));

		return recentSolos;
	};
</script>

<div>
	<Divider />
	<div class="overflow-x-auto">
		<table class="table-compact table table-zebra w-full">
			<thead>
				<tr>
					<th class="text-center">Player</th>
					<th class="text-center">{$t('leaderboard.shared.time')}</th>
					<th class="text-center">Category</th>
				</tr>
			</thead>
			<tbody>
				{#await fetchRuns()}
					<LoadingBar class="mt-2" showLabel={false} />
				{:then runs}
					{#each runs as run}
						<tr class="hover border-t border-t-secondary/20">
							<td>
								<div class="flex gap-1">
									<NgsClassIcon combatClass={run.partyMember?.mainClass} />
									<PlayerNameBadge
										player={mapPartyMemberToNamePref(run.partyMember)}
										showShipFlag={false}
									/>
								</div>
							</td>
							<td><TimeDisplay time={run.time} /></td>
							<td>{run.category}</td>
						</tr>
					{/each}
				{:catch err}
					<p>Error, please try again later</p>
				{/await}
			</tbody>
		</table>
	</div>
</div>
