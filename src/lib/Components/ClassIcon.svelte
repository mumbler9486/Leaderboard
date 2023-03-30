<script context="module" lang="ts">
	export type CombatClass =
		| 'hunter'
		| 'fighter'
		| 'ranger'
		| 'gunner'
		| 'force'
		| 'techter'
		| 'braver'
		| 'bouncer'
		| 'waker'
		| 'slayer'
		| 'unknown';
	export const parseCombatClass = (str: string) => {};
</script>

<script lang="ts">
	export let combatClass: CombatClass;
	export let showLabel: boolean = false;

	const classMap = {
		hunter: { name: 'Hunter', icon: '/icons/class/class-hunter.png' },
		fighter: { name: 'Fighter', icon: '/icons/class/class-fighter.png' },
		ranger: { name: 'Ranger', icon: '/icons/class/class-ranger.png' },
		gunner: { name: 'Gunner', icon: '/icons/class/class-gunner.png' },
		force: { name: 'Force', icon: '/icons/class/class-force.png' },
		techter: { name: 'Techter', icon: '/icons/class/class-techter.png' },
		braver: { name: 'Braver', icon: '/icons/class/class-braver.png' },
		bouncer: { name: 'Bouncer', icon: '/icons/class/class-bouncer.png' },
		waker: { name: 'Waker', icon: '/icons/class/class-waker.png' },
		slayer: { name: 'Slayer', icon: '/icons/class/class-gunblade.png' },
		unknown: { name: 'Unknown', icon: '/icons/class/class-unknown.png' }
	};

	$: classInfo = combatClass != 'unknown' ? classMap[combatClass] : classMap['unknown'];
</script>

<img src={classInfo.icon} class="inline w-[16px] object-none" alt={classInfo.name} />
{#if showLabel}
	{classInfo.name}
{/if}
