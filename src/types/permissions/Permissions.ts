import { PERMISSIONS } from "react-native-permissions";
import { UnifiedPermission } from "./UnifiedPermission";

export const Permissions: { [key: string]: UnifiedPermission } = {
	COARSE_LOCATION: {
		ios: [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE],
		android: [PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION],
	},
	CAMERA: {
		ios: [PERMISSIONS.IOS.CAMERA],
		android: [PERMISSIONS.ANDROID.CAMERA],
	},
	PHOTOS: {
		ios: [PERMISSIONS.IOS.PHOTO_LIBRARY],
		android: [PERMISSIONS.ANDROID.READ_MEDIA_IMAGES],
	},
};
