<script lang="ts">
	export let value: string | undefined;
	export let maxlength: number;
	export let placeholder: string = '';
	export let prompt: string | undefined = undefined;
	export let error: string | undefined = undefined;
	export let primary: boolean = false;
</script>

<label class="form-control w-full max-w-xs">
	{#if !!prompt && prompt.length > 0}
		<div class="label">
			<span class="label-text">{prompt}</span>
		</div>
	{/if}
	<input
		type="text"
		class="input input-bordered w-full max-w-xs"
		class:input-primary={primary}
		{maxlength}
		{placeholder}
		bind:value
		on:keyup
	/>
	{#if !!error && error.length > 0}
		<div class="label">
			<span class="label-text-alt text-error">{error}</span>
		</div>
	{/if}
</label>
