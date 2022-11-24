export const getFormattedDateString = (dateToGetFormattedStringOf: Date): string => {
	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"Jun",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const day = dateToGetFormattedStringOf.getDate();
	const monthIndex = dateToGetFormattedStringOf.getMonth();
	const monthName = monthNames[monthIndex];
	const year = dateToGetFormattedStringOf.getFullYear();

	return `${day} ${monthName} ${year}`;
};
