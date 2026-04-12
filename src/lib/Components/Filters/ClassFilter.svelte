<script lang="ts">
	import RadioButton from '$lib/Components/RadioButton.svelte';
	import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
	import { t } from 'svelte-i18n';

	interface Props {
		selectedClass?: string;
	}

	let { selectedClass = $bindable('no_filter') }: Props = $props();

	const filterClasses = [
		{ name: 'No Filter', value: 'no_filter', icon: '/icons/class/class-unknown.png' },
		{ name: 'Hunter', value: NgsPlayerClass.Hunter, icon: '/icons/class/class-hunter.png' },
		{ name: 'Fighter', value: NgsPlayerClass.Fighter, icon: '/icons/class/class-fighter.png' },
		{ name: 'Ranger', value: NgsPlayerClass.Ranger, icon: '/icons/class/class-ranger.png' },
		{ name: 'Gunner', value: NgsPlayerClass.Gunner, icon: '/icons/class/class-gunner.png' },
		{ name: 'Force', value: NgsPlayerClass.Force, icon: '/icons/class/class-force.png' },
		{ name: 'Techter', value: NgsPlayerClass.Techter, icon: '/icons/class/class-techter.png' },
		{ name: 'Braver', value: NgsPlayerClass.Braver, icon: '/icons/class/class-braver.png' },
		{ name: 'Bouncer', value: NgsPlayerClass.Bouncer, icon: '/icons/class/class-bouncer.png' },
		{ name: 'Waker', value: NgsPlayerClass.Waker, icon: '/icons/class/class-waker.png' },
		{ name: 'Slayer', value: NgsPlayerClass.Slayer, icon: '/icons/class/class-slayer.png' }
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
