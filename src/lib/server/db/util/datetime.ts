const epochMillis = new Date(Date.UTC(1970, 0, 1)).getTime();
export const convertTimeToRunTime = (time: Date) => {
	const millis = time.getTime();
	const duration = millis - epochMillis;

	const hours = Math.floor(duration / 3600000);
	const minutes = Math.floor((duration % 3600000) / 60000);
	const seconds = Math.floor((duration % 60000) / 1000);
	return {
		hours,
		minutes,
		seconds
	};
};
