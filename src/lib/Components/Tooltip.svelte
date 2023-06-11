<script lang="ts">
	export let tip: string;
	export let left: boolean = false;
</script>

<div class="tooltip tooltip-info" class:tooltip-left={left} data-tip={tip}>
	<slot />
</div>
