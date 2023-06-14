<script lang="ts">
	import InfoTooltip from '$lib/Components/InfoTooltip.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import { runForm } from './runStore';

	// The total allowable time for the quest
	export let limitMinutes: number;
	export let limitSeconds: number = 0;

	let minutes = limitMinutes;
	let seconds = limitSeconds;

	$: remainingSeconds = minutes * 60 + seconds;
	$: actualSeconds = Math.max(limitMinutes * 60 + limitSeconds - remainingSeconds - 1, 0);
	$: $runForm.time = {
		hours: 0,
		minutes: Math.floor(actualSeconds / 60),
		seconds: actualSeconds % 60
	};
</script>

<div class="form-control">
	<div class="label mt-1">
		<span class="label-text flex font-bold">
			Quest Time Remaining <InfoTooltip
				class="ml-1"
				tip="Input the remaining time as shown in your video. Your actual run time will be automatically calculated. Runs will count elapsed time and will be rounded down. See FAQ for more details."
			/>
		</span>
	</div>

	<label class="input-group">
		<input
			id="time-form-minutes"
			placeholder="MM"
			type="number"
			class="input-bordered input w-full"
			min="0"
			max={limitMinutes}
			maxlength="2"
			required
			bind:value={minutes}
		/>
		<span>:</span>
		<input
			id="time-form-seconds"
			placeholder="SS"
			type="number"
			class="input-bordered input w-full"
			min="0"
			max="60"
			maxlength="2"
			required
			bind:value={seconds}
		/>
		<span>/</span>
		<span>{limitMinutes}:{limitSeconds.toString().padStart(2, '0')}</span>
	</label>
	<div class="text-xs">
		Input the remaining time on the quest timer.<br />
		<span class="text-info">
			Your submission's run time is:
			<TimeDisplay time={$runForm.time} />
		</span>
	</div>
</div>
