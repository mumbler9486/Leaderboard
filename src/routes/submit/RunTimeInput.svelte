<script lang="ts">
	import InfoTooltip from '$lib/Components/InfoTooltip.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import Tooltip from '$lib/Components/Tooltip.svelte';
	import { runForm } from './runStore';

	export let maxMinutes: number = 59;
	export let maxSeconds: number = 59;

	let minutes = 0;
	let seconds = 0;

	$: $runForm.time = { hours: 0, minutes, seconds };

	export const resetForm = () => {
		minutes = 0;
		seconds = 0;
	};
</script>

<div class="form-control">
	<div class="label">
		<span class="label-text">
			Time Elapsed <InfoTooltip
				tip="Input the time elapsed as shown in game. It is the time shown with the last hit of damage occurred."
			/>
		</span>
	</div>
	<label class="join">
		<input
			placeholder="MM"
			type="number"
			class="input join-item input-bordered w-full"
			min="0"
			max={maxMinutes}
			maxlength="2"
			required
			bind:value={minutes}
		/>
		<span class="border-fallback join-item select-none border-b border-t border-primary px-4 pt-2"
			>:</span
		>
		<input
			placeholder="SS"
			type="number"
			class="input join-item input-bordered w-full"
			min="0"
			max={maxSeconds}
			maxlength="2"
			required
			bind:value={seconds}
		/>
		<span
			class="border-fallback join-item select-none border border-primary bg-neutral px-4 pt-2 text-center"
			><Tooltip left tip="Round your time down to nearest second">.000</Tooltip></span
		>
	</label>
	<div class="text-xs">
		<span class="text-info">
			Your submission's run time is:
			<TimeDisplay time={$runForm.time} />
		</span>
	</div>
</div>

<style scoped>
	.border-fallback {
		border-color: var(--fallback-bc, oklch(var(--bc) / 0.2));
	}
</style>
