<script lang="ts">
	import Select from '$lib/Components/Select.svelte';
	import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
	import { partyForm } from '../partyForm';

	export let playerIndex: number;
	export let selectedMainClass: string | undefined = undefined;
	export let selectedSubClass: string | undefined = undefined;

	const options = {
		[NgsPlayerClass.Hunter]: {
			label: 'Hunter',
			value: NgsPlayerClass.Hunter,
			icon: '/icons/class/class-hunter.png',
			disabled: false,
		},
		[NgsPlayerClass.Fighter]: {
			label: 'Fighter',
			value: NgsPlayerClass.Fighter,
			icon: '/icons/class/class-fighter.png',
			disabled: false,
		},
		[NgsPlayerClass.Ranger]: {
			label: 'Ranger',
			value: NgsPlayerClass.Ranger,
			icon: '/icons/class/class-ranger.png',
			disabled: false,
		},
		[NgsPlayerClass.Gunner]: {
			label: 'Gunner',
			value: NgsPlayerClass.Gunner,
			icon: '/icons/class/class-gunner.png',
			disabled: false,
		},
		[NgsPlayerClass.Force]: {
			label: 'Force',
			value: NgsPlayerClass.Force,
			icon: '/icons/class/class-force.png',
			disabled: false,
		},
		[NgsPlayerClass.Techter]: {
			label: 'Techter',
			value: NgsPlayerClass.Techter,
			icon: '/icons/class/class-techter.png',
			disabled: false,
		},
		[NgsPlayerClass.Braver]: {
			label: 'Braver',
			value: NgsPlayerClass.Braver,
			icon: '/icons/class/class-braver.png',
			disabled: false,
		},
		[NgsPlayerClass.Bouncer]: {
			label: 'Bouncer',
			value: NgsPlayerClass.Bouncer,
			icon: '/icons/class/class-bouncer.png',
			disabled: false,
		},
		[NgsPlayerClass.Waker]: {
			label: 'Waker',
			value: NgsPlayerClass.Waker,
			icon: '/icons/class/class-waker.png',
			disabled: false,
		},
		[NgsPlayerClass.Slayer]: {
			label: 'Slayer',
			value: NgsPlayerClass.Slayer,
			icon: '/icons/class/class-slayer.png',
			disabled: false,
		},
	};

	$: selectableMainClasses = Object.values(options).map((c) => ({
		...c,
		disabled: selectedSubClass == c.value,
	}));
	$: selectableSubClasses = Object.values(options).map((c) => ({
		...c,
		disabled: selectedMainClass == c.value,
	}));
	$: $partyForm[playerIndex].mainClass = selectedMainClass ?? '';
	$: $partyForm[playerIndex].subClass = selectedSubClass ?? '';
</script>

<div class="form-control">
	<Select
		label="Main Class"
		placeholder="Select a main class"
		options={selectableMainClasses}
		bind:value={selectedMainClass}
	/>
</div>

<div class="form-control">
	<Select
		label="Sub Class"
		placeholder="Select a sub class"
		options={selectableSubClasses}
		bind:value={selectedSubClass}
	/>
</div>
