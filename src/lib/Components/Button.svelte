<script lang="ts">
	//TODO improve by making keyup and click the same event
	export let disabled = false;
</script>

<button on:click on:keyup class="btn rounded md:btn-sm {$$props.class}" {disabled}>
	<slot />
</button>
