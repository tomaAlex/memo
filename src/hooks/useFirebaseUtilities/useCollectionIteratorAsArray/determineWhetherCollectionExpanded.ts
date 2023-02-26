const determineWhetherCollectionExpanded = <DataStructure>(
	collection: DataStructure[],
	possiblyNewElement: DataStructure
): boolean => {
	const hasElement = collection.some(
		(existingCollectionElement) => JSON.stringify(existingCollectionElement) === JSON.stringify(possiblyNewElement)
	);
	return !hasElement;
};

export default determineWhetherCollectionExpanded;
