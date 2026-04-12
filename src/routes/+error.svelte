<script lang="ts">
	import { t } from 'svelte-i18n';
	import { page } from '$app/state';
	import ErrorSplash from '$lib/components/page/error/ErrorSplash.svelte';

	let pageStatus = $derived(page.status);
	let pageErrorMessage = $derived(page.error?.message ?? 'Error');
</script>

<svelte:head>
	{#if pageStatus == 404}
		<title>{$t('shared.siteName')} - 404 Not Found</title>
	{:else if pageStatus == 401}
		<title>{$t('shared.siteName')} - 401 Not Authorized</title>
	{:else}
		<title>{$t('shared.siteName')} - {pageStatus} {pageErrorMessage}</title>
	{/if}
</svelte:head>
<div class="flex grow flex-col content-center">
	<div class="border-secondary bg-base-100/75 container mx-auto mt-8 flex grow rounded-md border">
		{#if pageStatus == 404}
			<ErrorSplash status={404} message={'Page not found'} />
		{:else if pageStatus == 401}
			<ErrorSplash status={401} message={'Not Authorized'} />
		{:else}
			<h1>{pageStatus} {pageErrorMessage}</h1>
		{/if}
	</div>
</div>
