<script lang="ts">
	import { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus';

	export let submissionStatus: RunSubmissionStatus;

	const statusMap = {
		[RunSubmissionStatus.Approved]: { label: 'Approved', class: 'text-success' },
		[RunSubmissionStatus.AwaitingApproval]: { label: 'Needs Review', class: 'text-warning' },
		[RunSubmissionStatus.Rejected]: { label: 'Rejected', class: 'text-error' }
	};

	$: statusInfo = statusMap[submissionStatus];
</script>

<span class={statusInfo.class}>{statusInfo.label}</span>
