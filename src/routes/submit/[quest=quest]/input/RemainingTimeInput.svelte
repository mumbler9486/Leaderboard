<script lang="ts">
	import InfoTooltip from '$lib/Components/InfoTooltip.svelte';
	import TimeDisplay from '$lib/Components/TimeDisplay.svelte';
	import { runForm } from '../forms/runForm';

	// The total allowable time for the quest
	interface Props {
		limitMinutes: number;
		limitSeconds?: number;
	}

	let { limitMinutes, limitSeconds = 0 }: Props = $props();

	let minutes = $state(limitMinutes);
	let seconds = $state(limitSeconds);

	let remainingSeconds = $derived(minutes * 60 + seconds);
	let actualSeconds = $derived(Math.max(limitMinutes * 60 + limitSeconds - remainingSeconds - 1, 0));
	let $runForm.time = $derived({
		hours: 0,
		minutes: Math.floor(actualSeconds / 60),
		seconds: actualSeconds % 60,
	});

	export const resetForm = () => {
		minutes = limitMinutes;
		seconds = limitSeconds;
	};
</script>

<label class="form-control w-full">
	<div class="label">
		<span class="label-text">
			Quest Time Remaining <InfoTooltip
				tip="Input the remaining time as shown in your video. Your actual run time will be automatically calculated. Runs will count elapsed time and will be rounded down. See FAQ for more details."
			/>
		</span>
	</div>
	<label class="join">
		<input
			placeholder="MM"
			type="number"
			class="input join-item input-bordered w-full"
			min="0"
			max={limitMinutes}
			maxlength="2"
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
			max="60"
			maxlength="2"
			bind:value={seconds}
		/>
		<span
			class="border-fallback join-item select-none border border-primary bg-neutral px-4 pt-2 text-center"
			>/{limitMinutes}:{limitSeconds.toString().padStart(2, '0')}</span
		>
	</label>
	<div class="label">
		<span class="label-text-alt">
			Input the remaining time on the quest timer.<br />
			<span class="text-info">
				Your submission's run time is:
				<TimeDisplay time={$runForm.time} />
			</span>
		</span>
	</div>
</label>

<style scoped>
	.border-fallback {
		border-color: var(--fallback-bc, oklch(var(--bc) / 0.2));
	}
</style>
