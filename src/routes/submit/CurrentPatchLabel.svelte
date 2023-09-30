<script lang="ts">
	import InfoTooltip from '$lib/Components/InfoTooltip.svelte';
	import { currentPatchLabel } from '$lib/constants/patchCodes';
</script>

<div class="label">
	<span class="label-text text-base font-semibold"
		>Current Patch <InfoTooltip
			class="ml-1"
			tip="If you need a different patch, please let us know in the run notes or contact us."
		/></span
	>
</div>
<input
	class="input input-bordered bg-neutral"
	type="text"
	required
	readonly
	value={currentPatchLabel}
/>
