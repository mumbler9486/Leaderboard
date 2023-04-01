export const fetchGetApi = async <T>(path: string, searchParams: any) => {
	const urlSearchParams = new URLSearchParams(searchParams);

	try {
		const response = await fetch(`${path}?${urlSearchParams.toString()}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const responseBody = await response.json();

		return responseBody as T;
	} catch (err) {
		console.error(err);
	}

	return undefined;
};
