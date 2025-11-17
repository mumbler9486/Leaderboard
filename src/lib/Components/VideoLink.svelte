<script lang="ts">
	import YouTubeIcon from './Icons/YouTubeIcon.svelte';

	interface Props {
		url: string | undefined;
	}

	let { url }: Props = $props();
</script>

<a href={url} target="_blank" rel="noreferrer noopener" class="link link-accent no-underline">
	<span class="flex flex-row items-center gap-1"><YouTubeIcon />Link</span>
</a>
