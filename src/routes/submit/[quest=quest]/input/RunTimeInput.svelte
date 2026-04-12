<script lang="ts">
	import { run } from 'svelte/legacy';

	import InfoTooltip from '$lib/components/InfoTooltip.svelte';
	import TimeDisplay from '$lib/components/TimeDisplay.svelte';
	import Tooltip from '$lib/components/Tooltip.svelte';
	import { runForm } from '../forms/runForm';

	interface Props {
		maxMinutes?: number;
		maxSeconds?: number;
	}

	let { maxMinutes = 59, maxSeconds = 59 }: Props = $props();

	let minutes = $state(0);
	let seconds = $state(0);

	run(() => {
		$runForm.time = { hours: 0, minutes, seconds };
	});

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
			class="input-bordered input join-item w-full"
			min="0"
			max={maxMinutes}
			maxlength="2"
			bind:value={minutes}
		/>
		<span class="border-fallback join-item border-t border-b border-primary px-4 pt-2 select-none"
			>:</span
		>
		<input
			placeholder="SS"
			type="number"
			class="input-bordered input join-item w-full"
			min="0"
			max={maxSeconds}
			maxlength="2"
			bind:value={seconds}
		/>
		<span
			class="border-fallback join-item border border-primary bg-neutral px-4 pt-2 text-center select-none"
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
