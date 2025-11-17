<script lang="ts">
	import { getYoutubeEmbedUrl } from '$lib/utils/youtube';
	import { tick } from 'svelte';

	interface Props {
		url: string | undefined;
	}

	let { url = $bindable() }: Props = $props();

	let videoUrl = $derived(url ? getYoutubeEmbedUrl(url) : '');

	export const stop = async () => {
		const oldUrl = url;
		url = '';
		await tick();
		url = oldUrl;
	};
</script>

<iframe
	class="aspect-video w-full"
	src={videoUrl}
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowfullscreen
></iframe>
