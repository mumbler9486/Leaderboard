<script lang="ts">
	import { t } from 'svelte-i18n';
	import { page } from '$app/stores';
	import ErrorSplash from '$lib/PageComponents/Error/ErrorSplash.svelte';

	$: pageStatus = $page.status;
	$: pageErrorMessage = $page.error?.message ?? 'Error';
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
	<div class="container mx-auto mt-8 flex grow rounded-md border border-secondary bg-base-100/75">
		{#if pageStatus == 404}
			<ErrorSplash status={404} message={'Page not found'} />
		{:else if pageStatus == 401}
			<ErrorSplash status={401} message={'Not Authorized'} />
		{:else}
			<h1>{pageStatus} {pageErrorMessage}</h1>
		{/if}
	</div>
</div>
