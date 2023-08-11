import { setLocale } from 'yup';

export interface ValidationErrorMessage {
	code: string;
	values: string[];
}

// Inits the locale for the schemas so that they can send translation keys and messages
export const initYupLocale = () =>
	setLocale({
		string: {
			matches: (ctx) =>
				({ code: 'Invalid characters used', values: [] } satisfies ValidationErrorMessage)
		}
	});
