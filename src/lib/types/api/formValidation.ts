import { writable, type Readable, type Writable } from 'svelte/store';
import { ValidationError, type AnyObject, type ObjectSchema } from 'yup';
import { ErrorCodes, type BadRequestApiError } from './error';
import type { ValidationErrorMessage } from './validation/schemaInitLocale';

/**
 * Creates a form that can be validated and present
 * UI errors to the user.
 * @param schema The yup schema to validate with
 * @param initialValues The object containing the fields that can be set, a deep copy is made from this object for the form
 * @returns A form object, bind inputs with this object.
 * A validation function to set error messages.
 * An error store to get error messages. If no error for that prop, undefined is returned
 */
export function useValidation<T extends AnyObject>(schema: ObjectSchema<T>, initialValues?: T) {
	const errorStore = writable({} as Record<keyof T, string | undefined>);

	// Clears a validation error
	const clearError = (propName: keyof T) => {
		errorStore.update((s) => {
			s[propName] = undefined;
			return s;
		});
	};

	// Proxy to reset the errors if any form property changes
	const proxyConstructor = (obj: any) => {
		const proxy = new Proxy(obj, {
			set(target, prop, value, receiver) {
				const propName = prop as keyof T;
				clearError(propName);
				target[propName] = value;
				return true;
			}
		});
		proxy.__isFormValidationProxy = true;
		return proxy;
	};

	// Creates a form that has change tracking
	const formStore = writable({} as Record<keyof T, string | undefined>);
	const form: Writable<Record<keyof T, string | undefined>> = {
		subscribe: formStore.subscribe,
		set: (f) => {
			let newValue = f;
			if (!f?.__isFormValidationProxy) {
				newValue = proxyConstructor(f) as Record<keyof T, string | undefined>;
			}
			formStore.set(newValue);
		},
		update: (f) => {
			formStore.update((old) => f(old));
		}
	};

	// Resets form to default/initial values
	const resetForm = () => {
		if (initialValues) {
			const initClone = structuredClone(initialValues);
			form.set(proxyConstructor(initClone) as Record<keyof T, string | undefined>);
		} else {
			form.set(proxyConstructor({}) as Record<keyof T, string | undefined>);
		}
	};
	resetForm();

	// Sets validation errors from a yup validation error
	// Requires abortEarly option to be false when validating
	const setValidationErrors = (validationError: ValidationError | BadRequestApiError) => {
		const errors: any = {};
		if (validationError instanceof ValidationError) {
			validationError.inner.forEach((errorDetails) => {
				if (errorDetails.path != null) {
					const isSimpleMessage = typeof errorDetails.message === 'string';
					if (isSimpleMessage) {
						errors[errorDetails.path] = errorDetails.message;
					} else {
						const codedMessage = errorDetails.message as unknown as ValidationErrorMessage;
						errors[errorDetails.path] = codedMessage.code;
					}
				}
			});
		} else {
			if (!validationError.details && validationError.code == ErrorCodes.ValidationError) {
				console.warn(`Bad request but no validation errors`, validationError);
				return;
			}
			validationError.details?.forEach((errorDetails) => {
				if (errorDetails.path != null) {
					errors[errorDetails.path] = errorDetails.message;
				}
			});
		}

		errorStore.set(errors as Record<keyof T, string | undefined>);
	};

	// Clears all errors
	const clearAllErrors = () => errorStore.set({} as Record<keyof T, string | undefined>);

	/**
	 * Validates an object
	 * @param schema
	 * @param value
	 * @returns
	 */
	const validate = async (value: any): Promise<T | undefined> => {
		try {
			const validated = (await schema.validate(value, {
				abortEarly: false,
				stripUnknown: true
			})) as T;
			clearAllErrors();
			return validated;
		} catch (err) {
			if (err instanceof ValidationError) {
				setValidationErrors(err);
			}

			return undefined;
		}
	};
	return {
		form,
		errors: { subscribe: errorStore.subscribe } as Readable<Record<keyof T, string | undefined>>,
		validate,
		resetForm,
		setValidationErrors,
		clearAllErrors
	};
}
