<script lang="ts">
	import RadioButton from '$lib/Components/RadioButton.svelte';
	import { t } from 'svelte-i18n';

	export let selectedClass: string = 'no_filter';

	const filterClasses = [
		{ name: 'No Filter', value: 'no_filter', icon: '/icons/class/class-unknown.png' },
		{ name: 'Hunter', value: 'hunter', icon: '/icons/class/class-hunter.png' },
		{ name: 'Fighter', value: 'fighter', icon: '/icons/class/class-fighter.png' },
		{ name: 'Ranger', value: 'ranger', icon: '/icons/class/class-ranger.png' },
		{ name: 'Gunner', value: 'gunner', icon: '/icons/class/class-gunner.png' },
		{ name: 'Force', value: 'force', icon: '/icons/class/class-force.png' },
		{ name: 'Techter', value: 'techter', icon: '/icons/class/class-techter.png' },
		{ name: 'Braver', value: 'braver', icon: '/icons/class/class-braver.png' },
		{ name: 'Bouncer', value: 'bouncer', icon: '/icons/class/class-bouncer.png' },
		{ name: 'Waker', value: 'waker', icon: '/icons/class/class-waker.png' },
		{ name: 'Slayer', value: 'slayer', icon: '/icons/class/class-slayer.png' }
	];
</script>

<div class="flex flex-row flex-wrap justify-center gap-1 md:justify-start">
	{#each filterClasses as mainClassFilter}
		<RadioButton
			bind:group={selectedClass}
			value={mainClassFilter.value}
			name="filter-class"
			icon={mainClassFilter.icon}
			alt={mainClassFilter.name}
		>
			{mainClassFilter.name}
		</RadioButton>
	{/each}
</div>
