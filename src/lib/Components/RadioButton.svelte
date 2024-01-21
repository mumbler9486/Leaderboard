<script lang="ts">
	export let icon: string | undefined = undefined;
	export let alt: string;
	export let value: string;
	export let name: string;
	export let group: any;
	export let disabled: boolean = false;
</script>

<div class="form-control">
	<label
		class="label w-32 cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2 md:w-[10.1rem]"
	>
		{#if !!icon}
			<img class="pointer-events-none" src={icon} {alt} />
		{/if}
		<span class="label-text"><slot /></span>
		<input
			type="radio"
			class="radio radio-sm rounded border-neutral-content/25 checked:bg-neutral-content"
			checked
			bind:group
			{name}
			{value}
			{disabled}
		/>
	</label>
</div>
