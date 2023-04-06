<script lang="ts">
	import { runForm } from './runStore';

	export let showHours: boolean = false;

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
				max="1"
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
			max="59"
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
			max="59"
			maxlength="2"
			required
			bind:value={seconds}
		/>
	</label>
	<div class="label">
		<span class="label-text"
			>This is the total time taken on your run.<br /><span class="text-warning"
				>Simplified time entry coming soon!</span
			></span
		>
	</div>
</div>
