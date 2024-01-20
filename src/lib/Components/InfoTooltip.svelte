<script lang="ts">
	import { InformationCircle } from 'svelte-heros-v2';

	export let tip: string;
	export let below: boolean = false;
</script>

<div
	class="tooltip tooltip-info cursor-pointer {$$props.class}"
	class:tooltip-bottom={below}
	data-tip={tip}
>
	<InformationCircle size="18" />
</div>
