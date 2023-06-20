// From the joshnuss/svelte-local-storage-store package
interface Serializer<T> {
	parse(text: string): T;
	stringify(object: T): string;
}

// For serializing raw strings in the svelte local store package
export const stringSerializer: Serializer<string> = {
	stringify: (str: string) => str,
	parse: (json: string) => json
};
