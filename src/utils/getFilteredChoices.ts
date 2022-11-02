export const getFilteredChoices = (allChoices: string[], searchTerm?: string): string[] => {
	if (searchTerm === undefined || searchTerm === "") {
		return allChoices;
	}
	return allChoices.filter((choice) => choice.toLowerCase().includes(searchTerm.toLowerCase()));
};
