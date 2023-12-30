<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import Badge from './Badge.svelte';

	export let label: string;
	export let subtitle: string | undefined = undefined;
	export let image: string | undefined = undefined;
	export let link: string | undefined = undefined;
	export let overlayColor: 'red' | 'blue' | 'purple' | 'neutral' = 'neutral';
	export let newBadge: string | undefined = undefined;
	export let buttonLabel: string;

	const dispatcher = createEventDispatcher();

	$: buttonAction = link ? gotoLink : dispatchClick;

	const gotoLink = (e: MouseEvent) => {
		goto(link!);
	};

	const dispatchClick = (e: MouseEvent) => {
		dispatcher('click', e);
	};

	const overlayColorMap: Record<string, string> = {
		red: 'bg-red-600',
		blue: 'bg-blue-600',
		purple: 'bg-purple-600',
		neutral: '',
	};
	$: overlayColorClass = overlayColorMap[overlayColor] ?? overlayColorMap['white'];
</script>

<div class="hero h-96 w-full rounded-md" style="background-image: url({image});">
	<div class="hero-overlay bg-opacity-20 {overlayColorClass}" />
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md">
			{#if !!newBadge}
				<Badge color="primary">{newBadge}</Badge>
			{/if}
			<h1 class="mb-5 text-5xl font-bold">{label}</h1>
			<p class="mb-5">
				{subtitle ?? ''}
			</p>
			<button
				class="btn btn-primary h-16 px-10 text-xl lg:h-auto lg:px-4 lg:text-base"
				on:click={buttonAction}>{buttonLabel}</button
			>
		</div>
	</div>
</div>
