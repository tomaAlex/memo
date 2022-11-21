import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

const getPreviewedTimeNumber = (timeNumberToPreview: number): string => {
	return timeNumberToPreview < 10 ? `0${timeNumberToPreview}` : `${timeNumberToPreview}`;
};

export const getRemainingTimePreview = (deadlineTimestamp: FirebaseFirestoreTypes.Timestamp): string => {
	const deadlineTime = deadlineTimestamp.toDate().getTime();
	const remainingMilliseconds = deadlineTime - Date.now();
	const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
	const secondsInHour = 60 * 60;
	const remainingHours = Math.floor(remainingSeconds / secondsInHour);
	const remainingSecondsWithoutHours = remainingSeconds - remainingHours * secondsInHour;
	const remainingMinutes = Math.floor(remainingSecondsWithoutHours / 60);
	const remainingHoursPreview = getPreviewedTimeNumber(remainingHours);
	const remainingMinutesPreview = getPreviewedTimeNumber(remainingMinutes);
	return `${remainingHoursPreview}:${remainingMinutesPreview}`;
};
