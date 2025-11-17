<script lang="ts">
	import Select, { type SelectValues } from '$lib/Components/Select.svelte';
	import { NgsPlayerClass } from '$lib/types/api/ngsPlayerClass';
	import { NgsPlayerStyleClass } from '$lib/types/api/ngsPlayerStyleClass';
	import { partyForm } from '../forms/partyForm';

	interface Props {
		playerIndex: number;
	}

	let { playerIndex }: Props = $props();
	let selectedMainClass: NgsPlayerClass = $state();
	let selectedSubClass: NgsPlayerClass = $state();
	let selectedStyleClass: NgsPlayerStyleClass = $derived(selectedStyleClass);

	const classOptions: Partial<Record<NgsPlayerClass, SelectValues<NgsPlayerClass>>> = {
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

	const styleOptions: Partial<Record<NgsPlayerStyleClass, SelectValues<NgsPlayerStyleClass>>> = {
		[NgsPlayerStyleClass.Adras]: {
			label: 'Adras',
			value: NgsPlayerStyleClass.Adras,
			icon: '/icons/styles/style-adras.png',
			disabled: false,
		},
		[NgsPlayerStyleClass.Blitz]: {
			label: 'Blitz',
			value: NgsPlayerStyleClass.Blitz,
			icon: '/icons/styles/style-blitz.png',
			disabled: false,
		},
		[NgsPlayerStyleClass.Celeste]: {
			label: 'Celeste',
			value: NgsPlayerStyleClass.Celeste,
			icon: '/icons/styles/style-celeste.png',
			disabled: false,
		},
		[NgsPlayerStyleClass.None]: {
			label: 'None',
			value: NgsPlayerStyleClass.None,
			icon: '/icons/styles/style-none.png',
			disabled: false,
		},
	};

	let selectableMainClasses = $derived(Object.values(classOptions).map((c) => ({
		...c,
		disabled: selectedSubClass == c.value,
	})));
	let selectableSubClasses = $derived(Object.values(classOptions).map((c) => ({
		...c,
		disabled: selectedMainClass == c.value,
	})));
	let selectableStyleClasses = $derived(Object.values(styleOptions));
	let $partyForm[playerIndex].mainClass = $derived(selectedMainClass);
	let $partyForm[playerIndex].subClass = $derived(selectedSubClass);
	
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

<div class="form-control">
	<Select
		label="Style"
		placeholder="Select a style class"
		options={selectableStyleClasses}
		bind:value={selectedStyleClass}
	/>
</div>
