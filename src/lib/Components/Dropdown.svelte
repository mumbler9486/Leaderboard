<script lang="ts">
	export let label: string;
	export let options: DropdownValues[];
	export let value: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;

	interface DropdownValues {
		label: string;
		value: string | number;
		icon?: string | undefined;
	}
</script>

<div class="label justify-center">
	<span class="label-text text-base font-semibold">{label}</span>
</div>
<select class="select-bordered select rounded" bind:value on:change>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
