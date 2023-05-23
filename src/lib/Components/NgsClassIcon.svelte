<script lang="ts">
	import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
	import Tooltip from './Tooltip.svelte';

	export let combatClass: NgsPlayerClass | undefined;
	export let showLabel: boolean = false;
	export let showTooltip: boolean = false;

	const classMap = {
		[NgsPlayerClass.Hunter]: { name: 'Hunter', icon: '/icons/class/class-hunter.png' },
		[NgsPlayerClass.Fighter]: { name: 'Fighter', icon: '/icons/class/class-fighter.png' },
		[NgsPlayerClass.Ranger]: { name: 'Ranger', icon: '/icons/class/class-ranger.png' },
		[NgsPlayerClass.Gunner]: { name: 'Gunner', icon: '/icons/class/class-gunner.png' },
		[NgsPlayerClass.Force]: { name: 'Force', icon: '/icons/class/class-force.png' },
		[NgsPlayerClass.Techter]: { name: 'Techter', icon: '/icons/class/class-techter.png' },
		[NgsPlayerClass.Braver]: { name: 'Braver', icon: '/icons/class/class-braver.png' },
		[NgsPlayerClass.Bouncer]: { name: 'Bouncer', icon: '/icons/class/class-bouncer.png' },
		[NgsPlayerClass.Waker]: { name: 'Waker', icon: '/icons/class/class-waker.png' },
		[NgsPlayerClass.Slayer]: { name: 'Slayer', icon: '/icons/class/class-slayer.png' },
		[NgsPlayerClass.Unknown]: { name: 'Unknown', icon: '/icons/class/class-unknown.png' }
	};

	$: classInfo = classMap[combatClass ?? NgsPlayerClass.Unknown];
</script>

{#if showTooltip}
	<Tooltip tip={classInfo.name}>
		<img src={classInfo.icon} class="inline w-[16px] object-none" alt={classInfo.name} />
		{#if showLabel}
			{classInfo.name}
		{/if}
	</Tooltip>
{:else}
	<img src={classInfo.icon} class="inline w-[16px] object-none" alt={classInfo.name} />
	{#if showLabel}
		{classInfo.name}
	{/if}
{/if}
