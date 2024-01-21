<script lang="ts">
	import InfoTooltip from '$lib/Components/InfoTooltip.svelte';
	import { currentPatchLabel } from '$lib/constants/patchCodes';
</script>

<label class="form-control w-full">
	<div class="label">
		<span class="label-text"
			>Current Patch <InfoTooltip
				class="ml-1"
				tip="If you need a different patch, please let us know in the run notes or contact us."
			/></span
		>
	</div>
	<input
		type="text"
		class="input input-bordered w-full bg-neutral"
		value={currentPatchLabel}
		readonly
	/>
</label>
