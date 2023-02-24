const determineWhetherNavigationIsOverlaid = (
	showOverlaidNavigation: {
		value: boolean;
		deactivateWhenLast: boolean;
	},
	isLastChildDisplayed: boolean
) => {
	const { value, deactivateWhenLast } = showOverlaidNavigation;
	return value && (!deactivateWhenLast || !isLastChildDisplayed);
};

export default determineWhetherNavigationIsOverlaid;
