export const isNullOrEmpty = (str: string | null | undefined) => !str || str === '';

/**
 * String format. Provide named placeholders in curly braces, then provide
 * as an object.
 * @param template 
 * @param values 
 * @returns 
 */
export function formatString(template: string, values: Record<string, string>) {
	return template.replace(/\{(.*?)}/g, (match, key) => values[key]);
}
