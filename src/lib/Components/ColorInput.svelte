<script lang="ts">
	interface Props {
		prompt?: string | undefined;
		error?: string | undefined;
		value?: string;
	}

	let { prompt = undefined, error = undefined, value = $bindable('#ffffff') }: Props = $props();
</script>

<label class="form-control w-full">
	<div class="label">
		{#if !!prompt && prompt.length > 0}
			<span class="label-text">{prompt}</span>
		{/if}
	</div>
	<input type="color" class="input input-bordered w-full" bind:value />
	<div class="label">
		{#if !!error && error.length > 0}
			<span class="label-text-alt text-error">{prompt}</span>
		{/if}
	</div>
</label>
