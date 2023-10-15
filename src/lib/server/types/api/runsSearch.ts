import type { RunSubmissionStatus } from '$lib/types/api/runs/submissionStatus';

// For search conditions that require server-side validation
// or not user controllable
export interface ServerSearchFilter {
	submitterId?: number;
	submissionStatus?: RunSubmissionStatus;
}
