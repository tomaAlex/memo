import { useCallback, useEffect, useState } from "react";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import { getRemainingTimePreview } from "Firebase/index";

export const useRemainingTimePreviewer = (deadlineTimestamp: FirebaseFirestoreTypes.Timestamp) => {
	const [remainingTime, setRemainingTime] = useState(getRemainingTimePreview(deadlineTimestamp));

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
