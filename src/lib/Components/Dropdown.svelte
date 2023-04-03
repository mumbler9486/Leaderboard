<script lang="ts">
	export let id: string;
	export let label: string;
	export let options: DropdownValues[];
	export let value: string | undefined = undefined;

	interface DropdownValues {
		label: string;
		value: string | number;
	}
</script>

<label class="label justify-center" for={id}>
	<span class="label-text text-base font-semibold">{label}</span>
</label>
<select class="select-bordered select rounded" {id} bind:value on:change>
	{#each options as option}
		<option value={option.value}>{option.label}</option>
	{/each}
</select>
