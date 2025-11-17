<script lang="ts">
	import { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus';

	interface Props {
		submissionStatus: RunSubmissionStatus;
	}

	let { submissionStatus }: Props = $props();

	const statusMap = {
		[RunSubmissionStatus.Approved]: { label: 'Approved', class: 'text-success' },
		[RunSubmissionStatus.AwaitingApproval]: { label: 'Awaiting Review', class: 'text-warning' },
		[RunSubmissionStatus.Rejected]: { label: 'Rejected', class: 'text-error' },
	};

	let statusInfo = $derived(statusMap[submissionStatus]);
</script>

<span class={statusInfo.class}>{statusInfo.label}</span>
