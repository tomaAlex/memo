import { Permission } from "react-native";
import { checkMultiple, requestMultiple, RESULTS } from "react-native-permissions";

/**
 * Having given an array of permissions, make sure the app has gathered them.
 * If there are any permissions which haven't been yet confirmed, ask the user
 * to confirm them.
 *
 * @param permissions The array of permissions to be checked and possibly confirmed.
 * @returns A promise resolving when all required permissions have been granted.
 */
export const handlePermissions = (
	permissions: Permission[],
	trial: number = 0,
	maximumPermissionsRequestAttempts: number = 3
): Promise<void> => {
	return new Promise<void>(async (resolve, reject) => {
		console.log("checking", permissions, `trial number ${trial}`);
		if (trial > maximumPermissionsRequestAttempts) {
			return reject(permissions);
		}
		const statuses = await checkMultiple(permissions);
		const notGrantedPermissions: Permission[] = permissions.filter(
			(permission) => statuses[permission] !== RESULTS.GRANTED
		);
		if (notGrantedPermissions.length == 0) return resolve();
		await requestMultiple(notGrantedPermissions);
		resolve(handlePermissions(notGrantedPermissions, trial + 1, maximumPermissionsRequestAttempts));
	});
};
