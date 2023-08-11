import { BadRequestError, InternalServerError } from '$lib/types/api/error';

export const fetchGetApi = async <T>(path: string, searchParams: any | undefined = undefined) => {
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
		throw new Error(`GET Fetch failed. Status=${response.status} ${response.statusText}`);
	}

	const responseBody = await response.json();
	return responseBody as T;
};

export const fetchPutApi = async <T>(path: string, requestBody: any) => {
	const response = await fetch(path, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestBody)
	});

	if (Math.floor(response.status / 500) == 1) {
		throw new InternalServerError(
			`PUT Fetch failed. Status=${response.status} ${response.statusText}`
		);
	}

	if (response.status == 400) {
		const responseBody = await response.json();
		throw new BadRequestError(`Bad Request`, responseBody);
	}

	const responseBody = await response.json();
	return responseBody as T;
};

export const fetchPostApi = async <T>(path: string, requestBody: any) => {
	const response = await fetch(path, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestBody)
	});

	if (Math.floor(response.status / 500) == 1) {
		throw new Error(`POST Fetch failed. Status=${response.status} ${response.statusText}`);
	}

	const responseBody = await response.json();
	return responseBody as T;
};
