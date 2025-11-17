<script lang="ts">
	interface Props {
		title: string;
		time: string;
		side?: 'left' | 'right';
		fillLineStart?: boolean;
		current?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		title,
		time,
		side = 'left',
		fillLineStart = false,
		current = false,
		children
	}: Props = $props();
</script>

<li>
	<hr class:bg-primary={fillLineStart} />
	<div class="timeline-middle">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-5 w-5"
			><path
				fill-rule="evenodd"
				d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
				clip-rule="evenodd"
			/></svg
		>
	</div>
	<div
		class="mb-10 md:text-end"
		class:timeline-start={side === 'left'}
		class:timeline-end={side === 'right'}
		class:md:text-end={side === 'left'}
	>
		<time class="font-mono italic">{time}</time>
		<div class="text-lg font-black">{title}</div>
		{#if current}
			<div class="italic text-info">Current patch</div>
		{/if}
		{@render children?.()}
	</div>
	<hr class:bg-primary={fillLineStart} />
</li>
