<script lang="ts">
	import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
	import FilterTag from './FilterTag.svelte';

	export let ngsClass: NgsPlayerClass;

	$: classInfo = classMap[ngsClass] ?? classMap[NgsPlayerClass.Unknown];

	const classMap: Record<NgsPlayerClass, any> = {
		[NgsPlayerClass.Hunter]: { label: 'Hunter Only', icon: '/icons/class/class-hunter.png' },
		[NgsPlayerClass.Fighter]: { label: 'Fighter Only', icon: '/icons/class/class-fighter.png' },
		[NgsPlayerClass.Ranger]: { label: 'Ranger Only', icon: '/icons/class/class-ranger.png' },
		[NgsPlayerClass.Gunner]: { label: 'Gunner Only', icon: '/icons/class/class-gunner.png' },
		[NgsPlayerClass.Force]: { label: 'Force Only', icon: '/icons/class/class-force.png' },
		[NgsPlayerClass.Techter]: { label: 'Techter Only', icon: '/icons/class/class-techter.png' },
		[NgsPlayerClass.Braver]: { label: 'Braver Only', icon: '/icons/class/class-braver.png' },
		[NgsPlayerClass.Bouncer]: { label: 'Bouncer Only', icon: '/icons/class/class-bouncer.png' },
		[NgsPlayerClass.Waker]: { label: 'Waker Only', icon: '/icons/class/class-waker.png' },
		[NgsPlayerClass.Slayer]: { label: 'Slayer Only', icon: '/icons/class/class-slayer.png' },
		[NgsPlayerClass.Unknown]: { label: 'Unknown', icon: '/icons/class/class-unknown.png' }
	};
</script>

<FilterTag icon={classInfo.icon} label={classInfo.label} on:click />
