import { getLocation } from "utils/index";
import firestore from "@react-native-firebase/firestore";

const updateUserLocation = async (userId: string): Promise<void> => {
	const currentCoordinates = await getLocation();
	await firestore().collection("users").doc(userId).update({
		coordinates: currentCoordinates,
	});
};

export default updateUserLocation;
