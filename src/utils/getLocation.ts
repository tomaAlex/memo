import { Coordinates } from "types/index";
import Geolocation from "@react-native-community/geolocation";

export const getLocation = async (): Promise<Coordinates> => {
	return new Promise<Coordinates>((resolve, reject) => {
		Geolocation.getCurrentPosition(
			(position) => {
				resolve({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
			},
			reject,
			{ enableHighAccuracy: false, timeout: 15000 }
		);
	});
};
