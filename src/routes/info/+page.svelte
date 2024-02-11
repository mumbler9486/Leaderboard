<script lang="ts">
	import Divider from '$lib/Components/Divider.svelte';
	import JumboButton from '$lib/Components/JumboButton.svelte';
	import { t } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | Information</title>
</svelte:head>

<div class="flex grow flex-col content-center">
	<div class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
		<div
			class="m-2 flex grow flex-col gap-1 rounded-md border border-secondary bg-base-100 p-4 px-8"
		>
			<div class="text-center text-4xl font-light">Information</div>
			<Divider />

			<div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
				<JumboButton
					label="All News"
					image="/info/news-icon.jpg"
					link="/info/news"
					overlayColor="black"
					buttonLabel="Read More"
				/>
				<JumboButton
					label="Patch Codes"
					image="/info/patch-code-icon.jpg"
					link="/info/patch-codes"
					overlayColor="neutral"
					buttonLabel="More Info"
				/>
			</div>
		</div>
	</div>
</div>
