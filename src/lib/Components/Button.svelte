<script lang="ts">
	//TODO improve by making keyup and click the same event
</script>

<button on:click on:keyup class="btn rounded md:btn-sm {$$props.class}">
	<slot />
</button>
