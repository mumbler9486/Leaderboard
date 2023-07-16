<script lang="ts">
	export let label: string;
	export let error: string | undefined = undefined;
</script>

<div class="form-control">
	<div class="label">
		<span class="label-text text-base font-semibold">{label}</span>
	</div>
	<slot />
	{#if error}
		<div class="text-xs text-error">
			{error}
		</div>
	{/if}
</div>
