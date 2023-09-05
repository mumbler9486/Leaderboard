export interface ApiError {
	code: string;
	details: string;
}

export interface BadRequestApiError {
	code: ErrorCodes;
	message: string;
	details?: {
		path: string;
		message: string;
		values?: string[];
	}[];
}

export enum ErrorCodes {
	ValidationError = 'validation_error',
	BadRequest = 'bad_request',
	Unexpected = 'unexpected', //TODO, remove this code for Internal Server Error
	Unauthorized = 'unauthorized'
}

export class BadRequestError extends Error {
	public response: BadRequestApiError;

	constructor(message: string, errorResponse: BadRequestApiError) {
		super(message);
		this.response = errorResponse;
	}
}

export class InternalServerError extends Error {}
