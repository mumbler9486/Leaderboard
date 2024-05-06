<script lang="ts">
	export let name: string; //Unique name for the group
	export let label: string | undefined = undefined;
	export let options: FilterOptions[];
	export let value: string;

	interface FilterOptions {
		label: string;
		value: string | number;
	}
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
