import { AndroidPermission, IOSPermission } from "react-native-permissions";

export interface UnifiedPermission {
	ios: IOSPermission[];
	android: AndroidPermission[];
}
