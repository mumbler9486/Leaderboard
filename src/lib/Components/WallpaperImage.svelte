<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	interface Props {
		src: string;
		thumb: string;
		alt: string;
		loading: 'eager' | 'lazy' | null | undefined;
		decoding: 'async' | 'sync' | 'auto' | null | undefined;
	}

	let {
		src,
		thumb,
		alt,
		loading,
		decoding
	}: Props = $props();

	let loaded = $state(false);
	let ref: any = $state();

	onMount(() => {
		if (ref.complete) loaded = true;
	});
</script>

<img
	{src}
	class="background pointer-events-none"
	{alt}
	{loading}
	{decoding}
	role="presentation"
	bind:this={ref}
	onload={() => (loaded = true)}
	transition:fade|global
/>
{#if !loaded}
	<img
		src={thumb}
		class="background blur pointer-events-none"
		class:loaded
		role="presentation"
		{alt}
		{loading}
		{decoding}
		transition:fade|global
	/>
{/if}

<style scoped>
	.background {
		position: fixed;
		height: 100%;
		width: 100%;
		color: transparent;
		object-fit: cover;
		background-position: center;
		background-size: cover;
		background-repeat: no-repeat;
		background-attachment: fixed;
		z-index: -10;
	}

	.blur {
		position: absolute;
		inset: 0;
		backdrop-filter: blur(20px);
		pointer-events: none;
	}
	.loaded {
		display: none;
	}
</style>
