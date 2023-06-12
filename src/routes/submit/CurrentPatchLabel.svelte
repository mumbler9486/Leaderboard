<script lang="ts">
	import { currentPatchLabel } from '$lib/constants/patchCodes';
</script>

<div class="label">
	<span class="label-text text-base font-semibold">Current Patch</span>
</div>
<input
	class="input-bordered input bg-neutral"
	type="text"
	required
	readonly
	value={currentPatchLabel}
/>
