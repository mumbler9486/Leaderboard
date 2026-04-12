<script lang="ts">
	import Badge from './Badge.svelte';

	interface Props {
		label: string;
		subtitle?: string | undefined;
		image?: string | undefined;
		link?: string | undefined;
		overlayColor?: 'red' | 'blue' | 'purple' | 'black' | 'neutral';
		badge?: string | undefined;
		buttonLabel: string;
	}

	let {
		label,
		subtitle = undefined,
		image = undefined,
		link = undefined,
		overlayColor = 'neutral',
		badge = undefined,
		buttonLabel
	}: Props = $props();

	const overlayColorMap: Record<string, string> = {
		red: 'bg-red-600',
		blue: 'bg-blue-600',
		purple: 'bg-purple-600',
		black: 'bg-black',
		neutral: '',
	};
	let overlayColorClass = $derived(overlayColorMap[overlayColor] ?? overlayColorMap['white']);
</script>

<div class="hero h-96 w-full rounded-md" style="background-image: url({image});">
	<div class="hero-overlay bg-opacity-20 {overlayColorClass}"></div>
	<div class="hero-content text-center text-neutral-content">
		<div class="max-w-md">
			{#if !!badge}
				<Badge color="primary">{badge}</Badge>
			{/if}
			<h1 class="mb-5 text-5xl font-bold">{label}</h1>
			<p class="mb-5">
				{subtitle ?? ''}
			</p>
			<a href={link} class="btn btn-primary h-16 px-10 text-xl lg:h-auto lg:px-4 lg:text-base"
				>{buttonLabel}</a
			>
		</div>
	</div>
</div>
