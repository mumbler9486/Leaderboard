<script lang="ts">
	import Dropdown from '$lib/Components/Dropdown.svelte';
	import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
	import { runForm } from './runStore';

	export let playerNumber: number;
	export let selectedMainClass: string | undefined = undefined;
	export let selectedSubClass: string | undefined = undefined;

	const options = {
		[NgsPlayerClass.Hunter]: {
			label: 'Hunter',
			value: 'hunter',
			icon: '/icons/class/class-hunter.png',
			disabled: false
		},
		[NgsPlayerClass.Fighter]: {
			label: 'Fighter',
			value: 'fighter',
			icon: '/icons/class/class-fighter.png',
			disabled: false
		},
		[NgsPlayerClass.Ranger]: {
			label: 'Ranger',
			value: 'ranger',
			icon: '/icons/class/class-ranger.png',
			disabled: false
		},
		[NgsPlayerClass.Gunner]: {
			label: 'Gunner',
			value: 'gunner',
			icon: '/icons/class/class-gunner.png',
			disabled: false
		},
		[NgsPlayerClass.Force]: {
			label: 'Force',
			value: 'force',
			icon: '/icons/class/class-force.png',
			disabled: false
		},
		[NgsPlayerClass.Techter]: {
			label: 'Techter',
			value: 'techter',
			icon: '/icons/class/class-techter.png',
			disabled: false
		},
		[NgsPlayerClass.Braver]: {
			label: 'Braver',
			value: 'braver',
			icon: '/icons/class/class-braver.png',
			disabled: false
		},
		[NgsPlayerClass.Bouncer]: {
			label: 'Bouncer',
			value: 'bouncer',
			icon: '/icons/class/class-bouncer.png',
			disabled: false
		},
		[NgsPlayerClass.Waker]: {
			label: 'Waker',
			value: 'waker',
			icon: '/icons/class/class-waker.png',
			disabled: false
		},
		[NgsPlayerClass.Slayer]: {
			label: 'Slayer',
			value: 'slayer',
			icon: '/icons/class/class-slayer.png',
			disabled: false
		}
	};

	$: selectableMainClasses = Object.values(options);
	$: selectableSubClasses = Object.values(options).map((c) => ({
		...c,
		disabled: selectedMainClass == c.value
	}));
	$: $runForm.players[playerNumber - 1].mainClass = selectedMainClass ?? '';
	$: $runForm.players[playerNumber - 1].subClass = selectedSubClass ?? '';
</script>

<div class="form-control">
	<Dropdown
		label="Main Class"
		placeholder="Select a main class"
		options={selectableMainClasses}
		bind:value={selectedMainClass}
	/>
</div>

<div class="form-control">
	<Dropdown
		label="Sub Class"
		placeholder="Select a sub class"
		options={selectableSubClasses}
		bind:value={selectedSubClass}
	/>
</div>
