export type RunTime = {
	hours: number;
	minutes: number;
	seconds: number;
};

export const runTimeEqual = (t1: RunTime, t2: RunTime): boolean => {
	return t1.hours === t2.hours && t1.minutes === t2.minutes && t1.seconds === t2.seconds;
};
