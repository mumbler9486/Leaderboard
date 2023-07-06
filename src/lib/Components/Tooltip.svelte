<script lang="ts">
	export let tip: string | undefined;
	export let left: boolean = false;
	export let bottom: boolean = false;
</script>

<div
	class:tooltip={!!tip}
	class:tooltip-info={!!tip}
	class:tooltip-left={left}
	class:tooltip-bottom={bottom}
	class={$$restProps.class}
	data-tip={tip}
>
	<slot />
</div>
