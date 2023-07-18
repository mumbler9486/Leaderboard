import { ErrorCodes, type BadRequestError, type BadRequestApiError } from '$lib/types/api/error';
import { ObjectSchema, ValidationError, type AnyObject } from 'yup';

/**
 *
 * @param schema Schema to validate with
 * @param value Value to validate
 * @returns object if successful, validationError if not.
 */
export const validateApiRequest = async <T extends AnyObject>(
	schema: ObjectSchema<T>,
	value: T
): Promise<{ object?: T; validationError?: BadRequestApiError }> => {
	try {
		const castedObject = (await schema.validate(value, {
			stripUnknown: true,
			abortEarly: false
		})) as T;
		return { object: castedObject, validationError: undefined };
	} catch (err) {
		if (err instanceof ValidationError) {
			return { object: undefined, validationError: mapValidationError(err) };
		} else {
			throw err;
		}
	}
};

export const mapValidationError = (error: ValidationError): BadRequestApiError => {
	const errors: {
		path: string;
		message: string;
	}[] = [];

	error.inner.forEach((errorDetails) => {
		if (errorDetails.path != null) {
			errors.push({
				path: errorDetails.path,
				message: errorDetails.message
			});
		}
	});
	return {
		code: ErrorCodes.ValidationError,
		message: 'Bad Request',
		details: errors
	};
};
