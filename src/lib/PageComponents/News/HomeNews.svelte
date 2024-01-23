<script>
	import Divider from '$lib/Components/Divider.svelte';
</script>

<div>
	<Divider />
	<div class="text-center text-2xl font-medium">
		<slot name="newsTitle">
			<em>Loading news...</em>
		</slot>
	</div>
	<br />
	<slot name="newsContent">
		<em>Loading content...</em>
	</slot>
</div>
