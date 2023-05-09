import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { getRemainingMillisecondsTime } from "./getRemainingMillisecondsTime";

const getPreviewedTimeNumber = (timeNumberToPreview: number): string => {
	return timeNumberToPreview < 10 ? `0${timeNumberToPreview}` : `${timeNumberToPreview}`;
};

export const getRemainingTimePreview = (deadlineTimestamp: FirebaseFirestoreTypes.Timestamp): string => {
	const remainingMilliseconds = getRemainingMillisecondsTime(deadlineTimestamp);
	const remainingSeconds = Math.floor(remainingMilliseconds / 1000);
	const secondsInHour = 60 * 60;
	const remainingHours = Math.floor(remainingSeconds / secondsInHour);
	const remainingSecondsWithoutHours = remainingSeconds - remainingHours * secondsInHour;
	const remainingMinutes = Math.floor(remainingSecondsWithoutHours / 60);
	const remainingHoursPreview = getPreviewedTimeNumber(remainingHours);
	const remainingMinutesPreview = getPreviewedTimeNumber(remainingMinutes);
	const remainingSecondsPreview = getPreviewedTimeNumber(remainingSecondsWithoutHours - remainingMinutes * 60);
	return `${remainingHoursPreview}h : ${remainingMinutesPreview}m : ${remainingSecondsPreview}s`;
};
