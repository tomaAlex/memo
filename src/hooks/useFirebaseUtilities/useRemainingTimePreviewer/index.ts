import { useCallback, useEffect, useState } from "react";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { getRemainingMillisecondsTime, getRemainingTimePreview } from "Firebase/index";

export const useRemainingTimePreviewer = (
	deadlineTimestamp: FirebaseFirestoreTypes.Timestamp,
	expiredCallback?: () => void
) => {
	const [remainingTime, setRemainingTime] = useState(getRemainingTimePreview(deadlineTimestamp));
	const callbackToCallWhenExpired = expiredCallback ?? (() => {});
	const expiredCallbackScheduledExecution = setTimeout(
		callbackToCallWhenExpired,
		getRemainingMillisecondsTime(deadlineTimestamp)
	);

	const cancelExpiredCallbackScheduledExecution = useCallback(() => {
		clearTimeout(expiredCallbackScheduledExecution);
	}, [expiredCallbackScheduledExecution]);

	useEffect(() => {
		return cancelExpiredCallbackScheduledExecution;
	}, [cancelExpiredCallbackScheduledExecution]);

	const updateRemainingTime = () => {
		setRemainingTime(getRemainingTimePreview(deadlineTimestamp));
	};

	const remainingTimeUpdater = setInterval(updateRemainingTime, 1000);
	const cleanup = useCallback(() => {
		clearInterval(remainingTimeUpdater);
	}, [remainingTimeUpdater]);

	useEffect(() => {
		return cleanup;
	}, [cleanup]);

	return remainingTime;
};
