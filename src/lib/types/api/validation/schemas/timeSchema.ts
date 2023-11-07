import { type InferType, string, number, object, array, boolean } from 'yup';

const runTimeSchema = object({
	hours: number().integer().min(0).max(6).required(),
	minutes: number().integer().min(0).max(59).required(),
	seconds: number().integer().min(0).max(59).required(),
});

export const yupRunTime = (maxSeconds: number = 21599) => {
	const hours = Math.floor(maxSeconds / 3600);
	const minutes = Math.floor((maxSeconds % 3600) / 60);
	const seconds = (maxSeconds % 3600) % 60;
	const maxTimeLabel = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')}`;

	return runTimeSchema.test(
		'max_run_time',
		`Run time cannot be more than ${maxTimeLabel}`,
		(runTime) => {
			const runSeconds = runTime.hours * 3600 + runTime.minutes * 60 + runTime.seconds;
			return runSeconds <= maxSeconds;
		}
	);
};

export const yupRunTimeMapped = (validTimesMap: Record<string, number>) => {
	return runTimeSchema.test(
		'max_run_time',
		(ctx) => {
			const validTime = validTimesMap[ctx.parent.category] ?? [];
			if (validTime === undefined || validTime === null) {
				return `Invalid time validation configuration.`;
			}

			const maxSeconds = validTime;
			const hours = Math.floor(maxSeconds / 3600);
			const minutes = Math.floor((maxSeconds % 3600) / 60);
			const seconds = (maxSeconds % 3600) % 60;
			const maxTimeLabel = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
				.toString()
				.padStart(2, '0')}`;
			return `Run time cannot be more than ${maxTimeLabel}`;
		},
		(runTime, ctx) => {
			const validTime = validTimesMap[ctx.parent.category] ?? [];
			if (validTime === undefined || validTime === null) {
				return false;
			}

			const maxSeconds = validTime;
			const runSeconds = runTime.hours * 3600 + runTime.minutes * 60 + runTime.seconds;
			return runSeconds <= maxSeconds;
		}
	);
};
