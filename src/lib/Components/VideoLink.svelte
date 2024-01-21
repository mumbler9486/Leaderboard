<script lang="ts">
	import YouTubeIcon from './Icons/YouTubeIcon.svelte';

	export let url: string | undefined;
</script>

<a href={url} target="_blank" rel="noreferrer noopener" class="link link-accent no-underline">
	<span class="flex flex-row items-center gap-1"><YouTubeIcon />Link</span>
</a>
