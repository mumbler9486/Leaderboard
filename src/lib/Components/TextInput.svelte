<script lang="ts">
	export let value: string;
	export let maxlength: number;
	export let placeholder: string = '';
	export let prompt: string | undefined = undefined;
</script>

{#if prompt}
	<label class="input-group">
		<span>{prompt}</span>
		<input
			type="text"
			class="input-bordered input w-full {$$restProps.class ?? ''}"
			{maxlength}
			{placeholder}
			bind:value
			on:keyup
		/>
	</label>
{:else}
	<input
		type="text"
		class="input-bordered input w-full {$$restProps.class ?? ''}"
		{maxlength}
		{placeholder}
		bind:value
		on:keyup
	/>
{/if}
