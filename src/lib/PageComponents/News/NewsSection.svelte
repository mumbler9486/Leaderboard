<script lang="ts">
	export let sectionTitle: string | undefined = undefined;
</script>

<div class="py-2">
	{#if !!sectionTitle}
		<strong>{sectionTitle}</strong>
	{/if}
	<p>
		<slot />
	</p>
</div>
