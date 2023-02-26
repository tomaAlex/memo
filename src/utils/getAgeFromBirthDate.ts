export const getAgeFromBirthDate = (birthDate: Date): number => {
	const millisecondsAge = Date.now() - new Date(birthDate).getTime();
	const ageDate = new Date(millisecondsAge);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
};
