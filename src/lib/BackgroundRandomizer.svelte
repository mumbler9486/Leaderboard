<script>
	import { onMount } from 'svelte';

	let backgrounds = [
		`url('/background/aelio-purp.png')`,
		`url('/background/aelio-purp-night.png')`,
		`url('/background/kvaris-purp.png')`,
		`url('/background/kvaris-purp-night.png')`,
		`url('/background/retem-purp.png')`,
		`url('/background/retem-purp-night.png')`,
		`url('/background/stia-purp.png')`,
		`url('/background/stia-purp-night.png')`
	];

	onMount(async () => {
		document.body.style.backgroundImage = backgrounds[(backgrounds.length * Math.random()) | 0];
		document.body.style.backgroundSize = 'cover';
		document.body.style.backgroundRepeat = 'no-repeat';
		document.body.style.backgroundAttachment = 'fixed';
		document.body.style.boxShadow = 'rgba(0,0,0,0.2) 0px 0px 0px 100vmax inset';
		document.body.style.backgroundPosition = 'center';
	});
</script>
