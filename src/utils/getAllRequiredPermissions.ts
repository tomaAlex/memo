import { Permission } from "react-native";
import { Permissions } from "types/permissions";
import { getMobileOS } from "./getMobileOS";
import { handlePermissions } from "./handlePermissions";
import { getNotificationsPermission } from "./getNotificationsPermission";

export const getAllRequiredPermissions = (): Promise<void> => {
	const mobileOS = getMobileOS();
	const { COARSE_LOCATION, CAMERA, PHOTOS } = Permissions;
	const requiredUnifiedPermissions = [CAMERA, PHOTOS, COARSE_LOCATION];
	const requiredPermissions = requiredUnifiedPermissions.map((unifiedPermission) => unifiedPermission[mobileOS]).flat();
	return new Promise<void>(async (resolve, reject) => {
		await getNotificationsPermission();
		handlePermissions(requiredPermissions as Permission[])
			.then(resolve)
			.catch((deniedPermissions: Permission[]) => {
				// Alert.alert("Grant permissions to continue", deniedPermissions.join("\n"));
				console.log("Permissions denied: ", deniedPermissions);
				resolve();
			});
	});
};
