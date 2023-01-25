const formatExpiryDate = (expiryMonth: number, expiryYear: number) => {
	const formattedExpiryMonth = expiryMonth < 10 ? `0${expiryMonth}` : expiryMonth;
	const formattedExpiryYear = expiryYear.toString().slice(2);
	return `${formattedExpiryMonth}/${formattedExpiryYear}`;
};

export default formatExpiryDate;
