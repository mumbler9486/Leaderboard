<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import Panel from '$lib/Components/Panel.svelte';
	import HomeNew10 from '$lib/Widgets/HomeNew10.svelte';
	import HomeNewAegis5 from '$lib/Widgets/HomeNewAegis5.svelte';
	import SoloStats from '$lib/Widgets/SoloStats.svelte';

	let currentTab: string = 'solo';

	$: soloTabActive = currentTab === 'solo';
	$: dfaTabActive = currentTab === 'dfa';

	const tabUpdate = (tab: string) => {
		currentTab = tab;
	};
</script>

<Panel title="Recent Runs">
	<div class="p-4">
		<div role="tablist" class="tabs-boxed tabs">
			<div
				role="tab"
				class="tab"
				class:tab-active={soloTabActive}
				tabindex="0"
				on:click={() => tabUpdate('solo')}
				on:keyup={() => tabUpdate('solo')}
			>
				Solo Runs
			</div>
			<div
				role="tab"
				class="tab"
				class:tab-active={dfaTabActive}
				tabindex="0"
				on:click={() => tabUpdate('dfa')}
				on:keyup={() => tabUpdate('dfa')}
			>
				DFA MPA Runs
			</div>
		</div>
		<div class:hidden={!soloTabActive}>
			<HomeNew10 />
			<Divider />
			<SoloStats />
		</div>
		<div class:hidden={soloTabActive}>
			<HomeNewAegis5 />
		</div>
	</div>
</Panel>
