<script lang="ts">
	let backgrounds = [
		'/background/aelio-purp.png',
		'/background/aelio-purp-night.png',
		'/background/kvaris-purp.png',
		'/background/kvaris-purp-night.png',
		'/background/retem-purp.png',
		'/background/retem-purp-night.png',
		'/background/stia-purp.png',
		'/background/stia-purp-night.png',
		'/background/venogia.jpg'
	];

	$: backgroundUrl = `url(${backgrounds[(backgrounds.length - 1 * Math.random()) | 0]})`;
</script>

<div class="background" style:background-image={backgroundUrl} />

<style>
	.background {
		position: fixed;
		height: 100%;
		width: 100%;
		top: 0;
		background-position: center;
		box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 0px 100vmax inset;
		background-size: cover;
		background-repeat: no-repeat;
		background-attachment: fixed;
		z-index: -10;
	}
</style>
