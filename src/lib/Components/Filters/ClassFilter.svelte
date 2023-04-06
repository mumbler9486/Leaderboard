<script lang="ts">
	import RadioButton from '$lib/Components/RadioButton.svelte';
	import { createEventDispatcher } from 'svelte';
	import { t } from 'svelte-i18n';
	const dispatch = createEventDispatcher();

	export let selectedClass: string = 'No Filter';

	const filterClasses = [
		{ name: 'No Filter', icon: '/icons/class/class-unknown.png' },
		{ name: 'Hunter', icon: '/icons/class/class-hunter.png' },
		{ name: 'Fighter', icon: '/icons/class/class-fighter.png' },
		{ name: 'Ranger', icon: '/icons/class/class-ranger.png' },
		{ name: 'Gunner', icon: '/icons/class/class-gunner.png' },
		{ name: 'Force', icon: '/icons/class/class-force.png' },
		{ name: 'Techter', icon: '/icons/class/class-techter.png' },
		{ name: 'Braver', icon: '/icons/class/class-braver.png' },
		{ name: 'Bouncer', icon: '/icons/class/class-bouncer.png' },
		{ name: 'Waker', icon: '/icons/class/class-waker.png' },
		{ name: 'Slayer', icon: '/icons/class/class-slayer.png' }
	];
</script>

<div class="flex flex-row flex-wrap justify-center gap-1 md:justify-start">
	{#each filterClasses as mainClassFilter}
		<RadioButton
			bind:group={selectedClass}
			value={mainClassFilter.name}
			name="filter-class"
			icon={mainClassFilter.icon}
			alt={mainClassFilter.name}
		>
			{mainClassFilter.name}
		</RadioButton>
	{/each}
</div>
