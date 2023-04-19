<script lang="ts">
	import type { RunTime } from '$lib/types/api/runTime';

	export let time: RunTime;

	$: timeLabel = formatIgt(time);

	const formatIgt = (time: RunTime) => {
		let hours = time.hours > 0 ? `${time.hours}h` : '';
		return `${hours} ${time.minutes}m ${time.seconds}s`.trim();
	};
</script>

<span>{timeLabel}</span>
