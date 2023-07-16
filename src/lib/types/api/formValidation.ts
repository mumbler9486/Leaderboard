import { writable, type Readable, type Writable } from 'svelte/store';
import { ValidationError, type AnyObject, type ObjectSchema } from 'yup';
import { ErrorCodes, type BadRequestApiError } from './error';

/**
 * Creates a form that can be validated and present
 * UI errors to the user.
 * @param schema The yup schema to validate with
 * @param initialValues The object containing the fields that can be set, a deep copy is made from this object for the form
 * @returns A form object, bind inputs with this object.
 * A validation function to set error messages.
 * An error store to get error messages. If no error for that prop, undefined is returned
 */
export function useValidation<T extends AnyObject>(
	schema: ObjectSchema<T>,
	initialValues?: Record<string | symbol, any>
) {
	const errorStore = writable<Record<string | symbol, string | undefined>>({});

	// Clears a validation error
	const clearError = (propName: string | symbol) => {
		errorStore.update((s) => {
			s[propName] = undefined;
			return s;
		});
	};

	// Proxy to reset the errors if any form property changes
	const proxyConstructor = (obj: Record<string | symbol, any>) => {
		const proxy = new Proxy(obj, {
			set(target, prop, value, receiver) {
				clearError(prop);
				target[prop] = value;
				return true;
			}
		});
		proxy.__isFormValidationProxy = true;
		return proxy;
	};

	// Creates a form that has change tracking
	const formStore = writable<Record<string | symbol, any>>(proxyConstructor({}));
	const form: Writable<Record<string | symbol, any>> = {
		subscribe: formStore.subscribe,
		set: (f) => {
			let newValue = f;
			if (!f?.__isFormValidationProxy) {
				newValue = proxyConstructor(f);
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
			form.set(proxyConstructor(initClone));
		} else {
			form.set(proxyConstructor({}));
		}
	};
	resetForm();

	// Sets validation errors from a yup validation error
	// Requires abortEarly option to be false when validating
	const setValidationErrors = (validationError: ValidationError | BadRequestApiError) => {
		const errors: Record<string, string | undefined> = {};

		if (validationError instanceof ValidationError) {
			validationError.inner.forEach((errorDetails) => {
				if (errorDetails.path != null) {
					errors[errorDetails.path] = errorDetails.message;
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

		errorStore.set(errors as { [P in keyof T]: string | undefined });
	};

	// Clears all errors
	const clearAllErrors = () => errorStore.set({});

	/**
	 * Validates an object
	 * @param schema
	 * @param value
	 * @returns
	 */
	const validate = async (value: T): Promise<T | undefined> => {
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
		errors: { subscribe: errorStore.subscribe } as Readable<
			Record<string | symbol, string | undefined>
		>,
		validate,
		resetForm,
		setValidationErrors,
		clearAllErrors
	};
}
