<script lang="ts">
	interface Props {
		maxlength: number;
		prompt?: string | undefined;
		error?: string | undefined;
		placeholder?: string;
		value: string | undefined;
	}

	let {
		maxlength,
		prompt = undefined,
		error = undefined,
		placeholder = '',
		value = $bindable()
	}: Props = $props();
</script>

<label class="form-control">
	<div class="label">
		{#if !!prompt && prompt.length > 0}
			<span class="label-text">{prompt}</span>
		{/if}
	</div>
	<textarea class="textarea textarea-bordered h-24 w-full" {placeholder} {maxlength} bind:value></textarea>
	<div class="label">
		{#if !!error && error.length > 0}
			<span class="label-text-alt text-error">{prompt}</span>
		{/if}
	</div>
</label>
