<script lang="ts">
	export let label: string;
	export let options: DropdownValues[];
	export let value: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;

	interface DropdownValues {
		label: string;
		value: string | number;
		icon?: string | undefined;
		disabled?: boolean;
	}
</script>

<div class="label justify-center">
	<span class="label-text text-base font-semibold">{label}</span>
</div>
<select class="select-bordered select rounded" bind:value on:change>
	{#if placeholder}
		<option disabled selected>{placeholder}</option>
	{/if}
	{#each options as option}
		{#if option.icon}
			<img src={option.icon} alt={`${option.value}-icon`} />
		{/if}
		<option value={option.value} disabled={option.disabled ?? false}>{option.label}</option>
	{/each}
</select>
