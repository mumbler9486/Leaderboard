<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let src: string;
	export let thumb: string;
	export let alt: string;
	export let loading: 'eager' | 'lazy' | null | undefined;
	export let decoding: 'async' | 'sync' | 'auto' | null | undefined;

	let loaded = false;
	let ref: any;

	onMount(() => {
		if (ref.complete) loaded = true;
	});
</script>

<img
	{src}
	class="background"
	{alt}
	{loading}
	{decoding}
	role="presentation"
	bind:this={ref}
	on:load={() => (loaded = true)}
	transition:fade|global
/>
{#if !loaded}
	<img
		src={thumb}
		class="background blur"
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
