export const fetchGetApi = async <T>(path: string, searchParams: any | undefined) => {
	const urlSearchParams = new URLSearchParams(searchParams);
	let url = `${path}?${urlSearchParams.toString()}`.trim();
	url = url.endsWith('?') ? url.substring(0, url.length - 1) : url;

	try {
		const response = await fetch(url, {
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
