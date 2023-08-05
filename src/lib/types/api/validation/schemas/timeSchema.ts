import { type InferType, string, number, object, array, boolean } from 'yup';

const runTimeSchema = object({
	hours: number().min(0).max(6).required(),
	minutes: number().min(0).max(59).required(),
	seconds: number().min(0).max(59).required()
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
