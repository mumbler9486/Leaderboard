<script lang="ts">
	export let title: string | undefined = undefined;
</script>

<div class="rounded-md border-base-100 bg-base-100">
	{#if !!title}
		<div class="pt-6 text-center text-4xl font-light">{title}</div>
	{/if}
	<slot />
</div>
