<script lang="ts">
	export let disabled = false;
</script>

<button on:click on:keyup class="btn rounded md:btn-sm {$$props.class}" {disabled}>
	<slot />
</button>
