export interface RunAttributeFilter {
	type: 'number' | 'string' | 'boolean';
	path: string;
	value: number | string | boolean;
}
