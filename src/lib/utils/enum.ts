/**
 * Converts an string enum's values to a map.
 * Note that the enum is keyed by lowercasing all
 * string values so be aware of duplicates
 * @param enumType The enum to create a map from
 * @returns A map keyed by the enum's values
 */
export const stringEnumValuesToMap = <T>(enumType: any): { [key: string]: T } => {
	const map = Object.keys(enumType)
		.filter((key) => isNaN(Number(key)))
		.reduce((prev, curr) => {
			prev[enumType[curr].toLowerCase()] = enumType[curr];
			return prev;
		}, {} as { [key: string]: T });

	return map;
};
