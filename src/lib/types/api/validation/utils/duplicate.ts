export const findDuplicates = <Y, T extends string | number | symbol>(
	list: Y[],
	propSelector: (obj: Y) => T
): Y[] => {
	if (list.length == 0) {
		return [];
	}

	const elementDictionary = list.reduce((prev, curr) => {
		const index = propSelector(curr);
		prev[index] = curr;
		return prev;
	}, {} as Record<T, Y>);

	const listAsCompare = list.map((l) => propSelector(l));
	const duplicates = listAsCompare.filter((element, index, arr) => arr.indexOf(element) !== index);

	return duplicates.map((d) => elementDictionary[d]);
};
