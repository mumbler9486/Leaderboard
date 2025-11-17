<script lang="ts">
	import type { RunTime } from '$lib/types/api/runTime';

	interface Props {
		time: RunTime;
	}

	let { time }: Props = $props();


	const formatIgt = (time: RunTime) => {
		let hours = time.hours > 0 ? `${time.hours}h` : '';
		return `${hours} ${time.minutes}m ${time.seconds}s`.trim();
	};
	let timeLabel = $derived(formatIgt(time));
</script>

<span>{timeLabel}</span>
