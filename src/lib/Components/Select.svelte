<script lang="ts" context="module">
	export interface SelectValues<T> {
		label: string;
		value: T;
		icon?: string | undefined;
		disabled?: boolean;
	}
	export type DropdownSize = 'lg' | 'md' | 'sm' | 'xs' | 'default';
</script>

<script lang="ts" generics="T">
	export let options: SelectValues<T>[];
	export let label: string | undefined = '';
	export let value: T | null | undefined = null;
	export let placeholder: string | undefined = undefined;
	export let disabled: boolean = false;
	export let error: string | undefined = undefined;
	export let size: DropdownSize = 'default';
	export let fullWidth: boolean = false;

	const sizeClasses: Record<DropdownSize, string> = {
		lg: 'select-lg',
		md: 'select-md',
		sm: 'select-sm',
		xs: 'select-xs',
		default: '',
	};
</script>

<label class="form-control {$$props.class}" class:w-full={fullWidth}>
	{#if !!label && label.length > 0}
		<div class="label">
			<span class="label-text-alt">{label}</span>
		</div>
	{/if}
	<select class="select select-bordered {sizeClasses[size]}" {disabled} bind:value on:change>
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
	{#if !!error && error.length > 0}
		<div class="label">
			<span class="label-text-alt text-error">{error}</span>
		</div>
	{/if}
</label>
