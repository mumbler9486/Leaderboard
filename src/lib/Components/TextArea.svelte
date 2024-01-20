<script lang="ts">
	export let maxlength: number;
	export let prompt: string | undefined = undefined;
	export let error: string | undefined = undefined;
	export let placeholder: string = '';
	export let value: string | undefined;
</script>

<label class="form-control">
	<div class="label">
		{#if !!prompt && prompt.length > 0}
			<span class="label-text">{prompt}</span>
		{/if}
	</div>
	<textarea class="textarea textarea-bordered h-24 w-full" {placeholder} {maxlength} bind:value />
	<div class="label">
		{#if !!error && error.length > 0}
			<span class="label-text-alt text-error">{prompt}</span>
		{/if}
	</div>
</label>
