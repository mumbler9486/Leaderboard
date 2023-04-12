<script lang="ts">
	export let tip: string;
</script>

<div class="tooltip tooltip-info" data-tip={tip}>
	<slot />
</div>
