<script lang="ts">
	export let options: DropdownValues[];
	export let label: string | undefined = undefined;
	export let value: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let disabled: boolean = false;
	export let error: string | undefined = undefined;

	interface DropdownValues {
		label: string;
		value: string | number;
		icon?: string | undefined;
		disabled?: boolean;
	}
</script>

<!-- TODO Rename class to Select to align with daisy ui -->
<label class="form-control w-full max-w-xs">
	<div class="label">
		<span class="label-text">{label}</span>
	</div>
	<select class="select select-bordered" {disabled} bind:value on:change>
		{#if placeholder}
			<option disabled selected>{placeholder}</option>
		{/if}
		{#each options as option}
			{#if option.icon}
				<img class="pointer-events-none" src={option.icon} alt={`${option.value}-icon`} />
			{/if}
			<option value={option.value} disabled={option.disabled ?? false}>{option.label}</option>
		{/each}
	</select>
	<div class="label">
		{#if !!error && error.length > 0}
			<span class="label-text-alt text-error">{error}</span>
		{/if}
	</div>
</label>
