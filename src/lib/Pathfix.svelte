<script lang="ts">
	import { userContext } from '$lib/store';
</script>

<svelte:head>
	<script
		src="https://labs.pathfix.com/helper.js"
		data-user-id={$userContext.userId}
		id="pinc.helper"
		modules="pinc.oauth.min"
		data-public-key="5CEFF650-2164-4303-837F-28F8FC6C85F4"
	></script>
</svelte:head>
<div
	data-oauth-ui="list-columns"
	data-oauth-ui-switches="statusOn,disconnect"
	data-oauth-icon-size="Medium"
	data-oauth-button-color="#007BFF"
	data-oauth-ui-providers=""
	data-oauth-ui-providerTypes=""
/>

<style>
	:root {
		--pinc-oauth-ui-panel-bg-color: #212529;
		--pinc-oauth-ui-panel-text-color: #000;
		--pinc-oauth-ui-panel-light-text-color: #6c757d;
		--pinc-oauth-ui-panel-hover-bg-color: rgba(232, 232, 232, 0.6);
	}
</style>
