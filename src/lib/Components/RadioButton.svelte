<script lang="ts">
	export let icon: string | undefined = undefined;
	export let alt: string;
	export let value: string;
	export let name: string;
	export let group: any;
</script>

<label
	class="label w-32 cursor-pointer gap-2 rounded border border-neutral-content/25 bg-neutral px-2 md:w-[10.1rem]"
>
	{#if icon != undefined}
		<img src={icon} {alt} />
	{/if}
	<span class="label-text text-neutral-content">
		<slot />
	</span>
	<input
		type="radio"
		{name}
		bind:group
		{value}
		class="radio radio-sm rounded border-neutral-content/25 checked:bg-neutral-content"
	/>
</label>
