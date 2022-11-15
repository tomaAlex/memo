import { MutableRefObject } from "react";
import handleLocationCollectionConfiguration from "./handleLocationCollectionConfiguration";
import updateUserLocation from "./updateUserLocation";

const handleLocationCollection = (
	currentLocationCollectionRoutineReference: MutableRefObject<NodeJS.Timeout | null>,
	userId?: string
): void => {
	const currentLocationCollectionRoutine = currentLocationCollectionRoutineReference.current;
	if (currentLocationCollectionRoutine) {
		clearInterval(currentLocationCollectionRoutine);
	}

	if (!userId) {
		currentLocationCollectionRoutineReference.current = null;
		return;
	}

	handleLocationCollectionConfiguration();
	updateUserLocation(userId);

	const collectionHoursTime = 1;
	const collectionMinutesTime = collectionHoursTime * 60;
	const collectionSecondsTime = collectionMinutesTime * 60;
	const collectionMillisecondsTime = collectionSecondsTime * 1000;

	currentLocationCollectionRoutineReference.current = setInterval(() => {
		updateUserLocation(userId);
	}, collectionMillisecondsTime);
};

export default handleLocationCollection;
