<script lang="ts" generics="T">
	import { run } from 'svelte/legacy';

	import { createEventDispatcher } from 'svelte';

	interface Props {
		name: string;
		label?: string | undefined;
		options: FilterOptions<T>[];
		value: T;
	}

	let {
		name,
		label = undefined,
		options,
		value = $bindable()
	}: Props = $props();

	const dispatch = createEventDispatcher();

	interface FilterOptions<T> {
		label: string;
		value: T;
	}

	run(() => {
		dispatch('changed', value);
	});
</script>

<div class="form-control">
	{#if !!label && label.length > 0}
		<div class="label">
			<span class="label-text">{label}</span>
		</div>
	{/if}
	<div class="join">
		{#each options as opt}
			<input
				class="btn join-item"
				type="radio"
				{name}
				aria-label={opt.label}
				value={opt.value}
				checked={value === opt.value}
				bind:group={value}
			/>
		{/each}
	</div>
</div>
