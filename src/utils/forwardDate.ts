export const frowardDate = (
	yearsToForward: number,
	monthsToForward: number,
	daysToForward: number,
	startingDate = new Date()
) => {
	const startingYear = startingDate.getFullYear();
	const startingMonth = startingDate.getMonth();
	const startingDay = startingDate.getDate();
	const yearsAlteredDate = new Date(new Date().setFullYear(startingYear + yearsToForward));
	const monthsAlteredDate = new Date(yearsAlteredDate.setMonth(startingMonth + monthsToForward));
	const daysAlteredDate = new Date(monthsAlteredDate.setDate(startingDay + daysToForward));
	return daysAlteredDate;
};
