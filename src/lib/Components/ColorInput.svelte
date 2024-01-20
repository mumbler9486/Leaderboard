<script lang="ts">
	export let prompt: string | undefined = undefined;
	export let error: string | undefined = undefined;
	export let value: string = '#ffffff';
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
