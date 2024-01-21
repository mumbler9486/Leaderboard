<script lang="ts">
	export let value: string | undefined;
	export let maxlength: number;
	export let required: boolean = false;
	export let placeholder: string = '';
	export let prompt: string | undefined = undefined;
	export let error: string | undefined = undefined;
	export let alt: string | undefined = undefined;
	export let primary: boolean = false;
	export let disabled: boolean = false;
</script>

<label class="form-control w-full">
	{#if !!prompt && prompt.length > 0}
		<div class="label">
			<span class="label-text">{prompt}</span>
		</div>
	{/if}
	<input
		type="text"
		class="input input-bordered w-full"
		class:input-primary={primary}
		{required}
		{maxlength}
		{placeholder}
		{disabled}
		bind:value
		on:keyup
	/>
	{#if !!error && error.length > 0}
		<div class="label">
			<span class="label-text-alt text-error">{error}</span>
		</div>
	{/if}
	{#if !!alt && alt.length > 0}
		<div class="label">
			<span class="label-text-alt">{alt}</span>
		</div>
	{/if}
</label>
