import { get, type Writable } from 'svelte/store';
import { goto } from '$app/navigation';
import { page } from '$app/stores';

/**
 * Copies an object and deletes params that are
 * undefined. Only shallow objects are copied
 */
export const copyQueryParams = (params: any) => {
	const copy = { ...params };
	Object.keys(copy).forEach((propertyKey) => {
		if (!copy[propertyKey]) {
			delete copy[propertyKey];
		}
	});

	return copy;
};

/**
 * Loads the query params into the store
 * @param pageStore
 * @param filterThing
 * @param paramNames
 */
export const loadUrlParams = <T extends Record<string, string | undefined>>(
	paramNames: Extract<keyof T, string>[]
): Record<Extract<keyof T, string>, string | null | undefined> => {
	const pageStore = get(page);
	const loadedFilters = paramNames.reduce((prev, paramKey) => {
		const queryValue = pageStore.url.searchParams.get(paramKey);
		prev[paramKey] = queryValue;
		return prev;
	}, {} as Record<Extract<keyof T, string>, string | null | undefined>);

	return loadedFilters;
};

/**
 * Sets and GOTO to query params for the current url
 * Use only properties that are strings,
 * @param queryParams The query parameters to set
 * @param paramNames The param names to set
 */
export const updateUrlParams = <T>(queryParams: any, paramNames: Extract<keyof T, string>[]) => {
	const pageStore = get(page);
	paramNames.forEach((paramKey) => {
		const queryValue = queryParams[paramKey];
		if (!queryValue) {
			pageStore.url.searchParams.delete(paramKey);
		} else if (typeof queryValue === 'string') {
			pageStore.url.searchParams.set(paramKey, queryValue);
		} else if (typeof queryValue === 'boolean') {
			pageStore.url.searchParams.set(paramKey, queryValue ? 'true' : 'false');
		} else if (typeof queryValue === 'number') {
			pageStore.url.searchParams.set(paramKey, queryValue.toString());
		}
	});

	goto(pageStore.url);
};
