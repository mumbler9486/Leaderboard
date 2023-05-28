export const fetchGetApi = async <T>(path: string, searchParams: any | undefined) => {
	const urlSearchParams = new URLSearchParams(searchParams);
	let url = `${path}?${urlSearchParams.toString()}`.trim();
	url = url.endsWith('?') ? url.substring(0, url.length - 1) : url;

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (Math.floor(response.status / 500) == 1) {
		throw new Error(`Fetch failed. Status=${response.status} ${response.statusText}`);
	}

	const responseBody = await response.json();
	return responseBody as T;
};
