<script lang="ts">
	import { t } from 'svelte-i18n';
	// @ts-nocheck
	import PrivacyPolicyComponent from './PrivacyPolicyComponent.svelte';
</script>

<svelte:head>
	<title>{$t('shared.siteName')} | Privacy Policy</title>
</svelte:head>

<div class="flex grow flex-col content-center">
	<div class="container m-16 mx-auto flex grow rounded-md border border-secondary bg-base-100/75">
		<div
			class="m-2 flex grow flex-col rounded-md border border-secondary bg-base-100 p-4 px-8 md:flex-col"
		>
			<PrivacyPolicyComponent />
		</div>
	</div>
</div>
