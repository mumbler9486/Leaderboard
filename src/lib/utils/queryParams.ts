import { get, writable, type Writable } from 'svelte/store';
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
export const loadUrlParams = <T extends Extract<string, string | undefined>>(
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
 * Sets query params for the current url, browser history not changed
 * Use only properties that are strings,
 * If the property is undefined, it is removed from the url
 * @param queryParams The query parameters to set
 * @param paramNames The param names to set
 */
export const updateUrlParams = <T>(queryParams: T, paramNames: Extract<keyof T, string>[]) => {
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
};

export interface UrlQueryParamRule<T> {
	name: Extract<keyof T, string>;
	undefinedValue?: string;
	defaultValue?: string;
}

/**
 * Setup store to listen to page url and events
 * @param filterStore The store that holds the filter values
 * @param filterParams List of param options to show in url.
 * Undefined value is a different key value as the "null" value for no filter situations.
 * Default value is used for situations where the param cannot be null but a default value is used in it's place.
 * @returns Active store state to turn on or off the subscription temporarily
 * A cleanup function to be used by svelte to clean up store subscriptions when page is unloaded
 */
export const useUrlFilterStore = <T>(
	filterStore: Writable<T>,
	filterParams: UrlQueryParamRule<T>[]
) => {
	// Page changes, reflect url params to store
	const unsubPageStore = page.subscribe(() => {
		const urlParams = loadUrlParams<T>(filterParams.map((f) => f.name));
		filterStore.update((f) => {
			filterParams.forEach((param) => {
				if (param.undefinedValue && param.defaultValue) {
					console.warn('Undefined and default value defined for url copy param. Ignoring');
					return;
				}

				if (param.undefinedValue) {
					const paramValue = urlParams[param.name];
					f[param.name] =
						paramValue === undefined || paramValue === null ? param.undefinedValue : paramValue;
				}

				if (param.defaultValue) {
					const paramValue = urlParams[param.name];
					f[param.name] =
						paramValue === undefined || paramValue === null ? param.defaultValue : paramValue;
				}
			});

			return f;
		});
	});

	// When the filter changes, reflect to URL
	const unsubFilterStore = filterStore.subscribe((f) => {
		const urlFilterValues = clearFilterValues(f, filterParams);
		updateUrlParams<T>(
			urlFilterValues,
			filterParams.map((param) => param.name)
		);
		if (true) {
			console.log('set url');
			const pageStore = get(page);
			goto(pageStore.url);
		}
	});

	// Use this to cleanup the subscriptions created by this function
	const cleanup = () => {
		unsubFilterStore();
		unsubPageStore();
	};

	return {
		cleanup
	};
};

/**
 * Create a copy of the filter with the default values undefined
 * Useful for having filter defaults as "no_filter" but need to be
 * undefined on the API request.
 * @param filter The filter values to create a copy of with cleared values
 * @param filterParams the filter param rules to determine undefined
 * @returns A copy of the filter with the values undefined according to the rules
 */
export const clearFilterValues = <T>(filter: T, filterParams: UrlQueryParamRule<T>[]) => {
	const clearedFilter: any = {}; //TODO make a proper type
	filterParams.forEach((param) => {
		if (param.undefinedValue && param.defaultValue) {
			console.warn(
				`Undefined and default value defined for URL param rule. Ignoring param=${param.name}.`
			);
			return;
		}

		if (param.undefinedValue) {
			const paramValue = filter[param.name];
			clearedFilter[param.name] = paramValue === param.undefinedValue ? undefined : paramValue;
			return;
		}
		if (param.defaultValue) {
			const paramValue = filter[param.name];
			clearedFilter[param.name] = paramValue ?? param.defaultValue;
			return;
		}
	});

	return clearedFilter;
};
