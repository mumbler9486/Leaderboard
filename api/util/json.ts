import { type HttpRequest } from '@azure/functions';

export const readJsonRequest = async <T>(request: HttpRequest) => {
	try {
		const requestBody = await request.json();
		return requestBody as T;
	} catch (err) {
		return undefined;
	}
};
