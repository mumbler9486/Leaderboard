import type { AnyObject, ObjectSchema } from 'yup';

/**
 * Parses the URL search params into an object for later parsing
 * Only grabs the search params that are specified in the schema
 * @returns An object similar to the schema but not yet validated
 */
export const parseToRawSchema = <T extends AnyObject>(url: URL, schema: ObjectSchema<T>) =>
	Object.keys(schema.fields)
		.map((paramName) => paramName)
		.reduce(
			(prev, paramName) => {
				prev[paramName] = url.searchParams.get(paramName);
				return prev;
			},
			{} as Record<string, string | null>
		);
