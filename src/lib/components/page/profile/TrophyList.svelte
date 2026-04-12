<script lang="ts">
	import type { Trophy } from '$lib/types/api/players/trophy';
	import TrophyBadge from './TrophyBadge.svelte';

	interface Props {
		trophies: string[];
	}

	let { trophies }: Props = $props();

	const unknownTrophy: Trophy = {
		name: '<Unknown>',
		description: '<Unknown>',
		image: ''
	};
	const trophyMap: { [trophyCode: string]: Trophy } = {
		hunter1: {
			name: 'Badge of Hunter',
			description: 'Awarded for bronze placement as a Hunter in Meteorn Records.',
			image: '/trophies/class/hunter/badge-of-hunter.png'
		},
		hunter2: {
			name: 'Honor of Hunter',
			description: 'Awarded for silver placement as a Hunter in Meteorn Records.',
			image: '/trophies/class/hunter/honor-of-hunter.png'
		},
		hunter3: {
			name: 'Ace of Hunter',
			description: 'Awarded for gold placement as a Hunter in Meteorn Records.',
			image: '/trophies/class/hunter/ace-of-hunter.png'
		},
		hunter4: {
			name: 'Hero of Hunter',
			description: 'Awarded for distinguished activity as a Hunter.',
			image: '/trophies/class/hunter/hero-of-hunter.png'
		},
		fighter1: {
			name: 'Badge of Fighter',
			description: 'Awarded for bronze placement as a Fighter in Meteorn Records.',
			image: '/trophies/class/fighter/badge-of-fighter.png'
		},
		fighter2: {
			name: 'Honor of Fighter',
			description: 'Awarded for silver placement as a Fighter in Meteorn Records.',
			image: '/trophies/class/fighter/honor-of-fighter.png'
		},
		fighter3: {
			name: 'Ace of Fighter',
			description: 'Awarded for gold placement as a Fighter in Meteorn Records.',
			image: '/trophies/class/fighter/ace-of-fighter.png'
		},
		fighter4: {
			name: 'Hero of Fighter',
			description: 'Awarded for distinguished activity as a Fighter.',
			image: '/trophies/class/fighter/hero-of-fighter.png'
		},
		ranger1: {
			name: 'Badge of Ranger',
			description: 'Awarded for bronze placement as a Ranger in Meteorn Records.',
			image: '/trophies/class/ranger/badge-of-ranger.png'
		},
		ranger2: {
			name: 'Honor of Ranger',
			description: 'Awarded for silver placement as a Ranger in Meteorn Records.',
			image: '/trophies/class/ranger/honor-of-ranger.png'
		},
		ranger3: {
			name: 'Ace of Ranger',
			description: 'Awarded for gold placement as a Ranger in Meteorn Records.',
			image: '/trophies/class/ranger/ace-of-ranger.png'
		},
		ranger4: {
			name: 'Hero of Ranger',
			description: 'Awarded for distinguished activity as a Ranger.',
			image: '/trophies/class/ranger/hero-of-ranger.png'
		},
		gunner1: {
			name: 'Badge of Gunner',
			description: 'Awarded for bronze placement as a Gunner in Meteorn Records.',
			image: '/trophies/class/gunner/badge-of-gunner.png'
		},
		gunner2: {
			name: 'Honor of Gunner',
			description: 'Awarded for silver placement as a Gunner in Meteorn Records.',
			image: '/trophies/class/gunner/honor-of-gunner.png'
		},
		gunner3: {
			name: 'Ace of Gunner',
			description: 'Awarded for gold placement as a Gunner in Meteorn Records.',
			image: '/trophies/class/gunner/ace-of-gunner.png'
		},
		gunner4: {
			name: 'Hero of Gunner',
			description: 'Awarded for distinguished activity as a Gunner.',
			image: '/trophies/class/gunner/hero-of-gunner.png'
		},
		force1: {
			name: 'Badge of Force',
			description: 'Awarded for bronze placement as a Force in Meteorn Records.',
			image: '/trophies/class/force/badge-of-force.png'
		},
		force2: {
			name: 'Honor of Force',
			description: 'Awarded for silver placement as a Force in Meteorn Records.',
			image: '/trophies/class/force/honor-of-force.png'
		},
		force3: {
			name: 'Ace of Force',
			description: 'Awarded for gold placement as a Force in Meteorn Records.',
			image: '/trophies/class/force/ace-of-force.png'
		},
		force4: {
			name: 'Hero of Force',
			description: 'Awarded for distinguished activity as a Force.',
			image: '/trophies/class/force/hero-of-force.png'
		},
		techter1: {
			name: 'Badge of Techter',
			description: 'Awarded for bronze placement as a Techter in Meteorn Records.',
			image: '/trophies/class/techter/badge-of-techter.png'
		},
		techter2: {
			name: 'Honor of Techter',
			description: 'Awarded for silver placement as a Techter in Meteorn Records.',
			image: '/trophies/class/techter/honor-of-techter.png'
		},
		techter3: {
			name: 'Ace of Techter',
			description: 'Awarded for gold placement as a Techter in Meteorn Records.',
			image: '/trophies/class/techter/ace-of-techter.png'
		},
		techter4: {
			name: 'Hero of Techter',
			description: 'Awarded for distinguished activity as a Techter.',
			image: '/trophies/class/techter/hero-of-techter.png'
		},
		braver1: {
			name: 'Badge of Braver',
			description: 'Awarded for bronze placement as a Braver in Meteorn Records.',
			image: '/trophies/class/braver/badge-of-braver.png'
		},
		braver2: {
			name: 'Honor of Braver',
			description: 'Awarded for silver placement as a Braver in Meteorn Records.',
			image: '/trophies/class/braver/honor-of-braver.png'
		},
		braver3: {
			name: 'Ace of Braver',
			description: 'Awarded for gold placement as a Braver in Meteorn Records.',
			image: '/trophies/class/braver/ace-of-braver.png'
		},
		braver4: {
			name: 'Hero of Braver',
			description: 'Awarded for distinguished activity as a Braver.',
			image: '/trophies/class/braver/hero-of-braver.png'
		},
		bouncer1: {
			name: 'Badge of Bouncer',
			description: 'Awarded for bronze placement as a Bouncer in Meteorn Records.',
			image: '/trophies/class/bouncer/badge-of-bouncer.png'
		},
		bouncer2: {
			name: 'Honor of Bouncer',
			description: 'Awarded for silver placement as a Bouncer in Meteorn Records.',
			image: '/trophies/class/bouncer/honor-of-bouncer.png'
		},
		bouncer3: {
			name: 'Ace of Bouncer',
			description: 'Awarded for gold placement as a Bouncer in Meteorn Records.',
			image: '/trophies/class/bouncer/ace-of-bouncer.png'
		},
		bouncer4: {
			name: 'Hero of Bouncer',
			description: 'Awarded for distinguished activity as a Bouncer.',
			image: '/trophies/class/bouncer/hero-of-bouncer.png'
		},
		waker1: {
			name: 'Badge of Waker',
			description: 'Awarded for bronze placement as a Waker in Meteorn Records.',
			image: '/trophies/class/waker/badge-of-waker.png'
		},
		waker2: {
			name: 'Honor of Waker',
			description: 'Awarded for silver placement as a Waker in Meteorn Records.',
			image: '/trophies/class/waker/honor-of-waker.png'
		},
		waker3: {
			name: 'Ace of Waker',
			description: 'Awarded for gold placement as a Waker in Meteorn Records.',
			image: '/trophies/class/waker/ace-of-waker.png'
		},
		waker4: {
			name: 'Hero of Waker',
			description: 'Awarded for distinguished activity as a Waker.',
			image: '/trophies/class/waker/hero-of-waker.png'
		}
	};

	let mappedTrophies = $derived(trophies.map((t) => {
		const trophy = trophyMap[t];
		if (!trophy) {
			console.warn(`Unknown trophy ${t}`);
			return unknownTrophy;
		}

		return trophy;
	}));
</script>

<div class="flex gap-4">
	{#each mappedTrophies as trophy}
		<TrophyBadge {trophy} />
	{/each}
</div>
