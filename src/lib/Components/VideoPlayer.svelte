<script lang="ts">
	import { getYoutubeEmbedUrl } from '$lib/utils/youtube';

	export let url: string | undefined;

	$: videoUrl = url ? getYoutubeEmbedUrl(url) : '';
</script>

<iframe
	class="aspect-video w-full"
	src={videoUrl}
	title="YouTube video player"
	frameborder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowfullscreen
/>
