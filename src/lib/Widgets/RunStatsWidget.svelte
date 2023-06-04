<script lang="ts">
	import HomeNew10 from '$lib/LeaderboardComponents/HomeNew10.svelte';
	import HomeNewAegis5 from '$lib/LeaderboardComponents/HomeNewAegis5.svelte';
	import SoloPurpleStats from '$lib/StatComponents/SoloPurpleStats.svelte';

	let currentTab: string = 'solo';

	$: soloTabActive = currentTab === 'solo';
	$: dfaTabActive = currentTab === 'dfa';

	const tabUpdate = (tab: string) => {
		currentTab = tab;
	};
</script>

<div class="m-2 mt-0 h-full grow rounded-md border border-secondary bg-base-100 p-4 px-8 md:ml-0">
	<div class="tabs tabs-boxed mb-4 flex grow">
		<a
			id="tab1"
			class="tab grow"
			class:tab-active={soloTabActive}
			on:click={() => tabUpdate('solo')}
			on:keyup={() => tabUpdate('solo')}>Newest 10 Solo Runs</a
		>
		<a
			id="tab2"
			class="tab grow"
			class:tab-active={dfaTabActive}
			on:click={() => tabUpdate('dfa')}
			on:keyup={() => tabUpdate('dfa')}>Newest 5 DFA MPA Runs</a
		>
	</div>
	<span id="tabcontent1" class:hidden={!soloTabActive}>
		<HomeNew10 />
		<div class="divider -mx-8" />
		<SoloPurpleStats />
	</span>
	<span id="tabcontent2" class:hidden={!dfaTabActive}>
		<HomeNewAegis5 />
	</span>
</div>
