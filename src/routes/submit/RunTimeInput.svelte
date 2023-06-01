<script lang="ts">
	import { runForm } from './runStore';

	export let showHours: boolean = false;

	export let maxHours: number = 2;
	export let maxMinutes: number = 59;
	export let maxSeconds: number = 59;

	let hours = 0;
	let minutes = 0;
	let seconds = 0;

	$: $runForm.time = { hours, minutes, seconds };
</script>

<div class="form-control">
	<div class="label mt-1">
		<span class="label-text font-bold">Time</span>
	</div>

	<label class="input-group">
		{#if showHours}
			<input
				id="time-form-hours"
				placeholder="H"
				type="number"
				class="svelte-blgex8 input-bordered input w-full"
				min="0"
				max={maxHours}
				maxlength="1"
				required
				bind:value={hours}
			/>
			<span>:</span>
		{/if}
		<input
			id="time-form-minutes"
			placeholder="MM"
			type="number"
			class="input-bordered input w-full"
			min="0"
			max={maxMinutes}
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
			max={maxSeconds}
			maxlength="2"
			required
			bind:value={seconds}
		/>
	</label>
	<div class="label">
		<span class="label-text"> This is the total time taken on your run. Use In-Game Time.</span>
	</div>
</div>
