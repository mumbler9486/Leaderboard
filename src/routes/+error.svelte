<script lang="ts">
	import { t } from 'svelte-i18n';
	// @ts-nocheck
	import { page } from '$app/stores';
	import FOFError from '$lib/PageComponents/Error/FOFError.svelte';
	import AuthError from '$lib/PageComponents/Error/AuthError.svelte';
</script>

<svelte:head>
	{#if $page.status == 404}
		<title>{$t('shared.siteName')} - 404 Not Found</title>
	{:else if $page.status == 401}
		<title>{$t('shared.siteName')} - 401 Not Authorized</title>
	{:else}
		<title>{$t('shared.siteName')} - {$page.status} {$page.error.message}</title>
	{/if}
</svelte:head>
<div class="flex grow flex-col content-center">
	<div class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
		<div
			class="m-2 flex grow flex-col rounded-md border border-secondary bg-base-100 p-4 px-8 md:flex-row"
		>
			{#if $page.status == 404}
				<FOFError />
			{:else if $page.status == 401}
				<AuthError />
			{:else}
				<h1>{$page.status} {$page.error.message}</h1>
			{/if}
		</div>
	</div>
</div>
