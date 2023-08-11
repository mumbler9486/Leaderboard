import { ErrorCodes, type BadRequestApiError } from '$lib/types/api/error';
import type { ValidationErrorMessage } from '$lib/types/api/validation/schemaInitLocale';
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
	const errors: BadRequestApiError['details'] = [];

	error.inner.forEach((errorDetails) => {
		if (errorDetails.path != null) {
			const isSimpleMessage = typeof errorDetails.message === 'string';
			if (isSimpleMessage) {
				errors.push({
					path: errorDetails.path,
					message: errorDetails.message
				});
			} else {
				const codedMessage = errorDetails.message as unknown as ValidationErrorMessage;
				errors.push({
					path: errorDetails.path,
					message: codedMessage.code,
					values: codedMessage.values
				});
			}
		}
	});
	return {
		code: ErrorCodes.ValidationError,
		message: 'Bad Request',
		details: errors
	};
};
