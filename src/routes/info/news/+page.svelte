<script lang="ts">
	import { t } from 'svelte-i18n';

	import HomeNews from '$lib/PageComponents/News/HomeNews.svelte';
	import DiscordContact from '$lib/Components/DiscordContact.svelte';
	import AllNews from './articles/AllNews.svelte';
</script>

<div class="flex grow flex-col content-center">
	<div class="container mx-auto mb-16 mt-16 rounded-md border border-secondary bg-base-100/75">
		<div class="align-center flex flex-col md:flex-row">
			<div class="m-2 rounded-md border border-secondary bg-base-100 p-4 px-8 lg:basis-2/3">
				<div class="text-center text-4xl font-light">News</div>
				<AllNews />
			</div>
			<div
				class="mt-0 hidden grow flex-col-reverse overflow-x-auto md:mt-2 md:basis-1/3 md:flex-col lg:flex"
			>
				<div
					class="m-2 mt-0 h-full grow rounded-md border border-secondary bg-base-100 p-4 px-8 md:ml-0"
				></div>
			</div>
		</div>
	</div>
</div>
