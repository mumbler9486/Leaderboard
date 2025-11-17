<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	interface Props {
		value: string | undefined;
		maxlength: number;
		placeholder?: string;
		prompt?: string | undefined;
		error?: string | undefined;
		alt?: string | undefined;
		primary?: boolean;
		disabled?: boolean;
	}

	let {
		value = $bindable(),
		maxlength,
		placeholder = '',
		prompt = undefined,
		error = undefined,
		alt = undefined,
		primary = false,
		disabled = false
	}: Props = $props();
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
		{maxlength}
		{placeholder}
		{disabled}
		bind:value
		onkeyup={bubble('keyup')}
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
