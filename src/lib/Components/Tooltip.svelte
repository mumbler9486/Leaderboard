<script lang="ts">
	export let tip: string;
	export let left: boolean = false;
	export let bottom: boolean = false;
</script>

<div
	class="tooltip tooltip-info"
	class:tooltip-left={left}
	class:tooltip-bottom={bottom}
	data-tip={tip}
>
	<slot />
</div>
