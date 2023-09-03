<script lang="ts">
	export let disabled = false;
	export let primary = false;
</script>

<button
	on:click
	on:keyup
	class="btn rounded md:btn-sm {$$props.class}"
	class:btn-primary={primary}
	{disabled}
>
	<slot />
</button>
