import React, { useState } from "react";
import { SvgProps } from "react-native-svg";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./SettingsPreferencesButton.module.scss";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SettingsPreferencesScreenNames, SettingsPreferencesNavigationStackTypes } from "types";
import { cx } from "utils";

type TProps<HasCustomBehavior extends boolean> = {
	PreferenceIcon: React.FC<SvgProps>;
	fillIcon?: boolean;
	hasCustomBehavior?: HasCustomBehavior;
	preferenceScreen?: HasCustomBehavior extends true ? null : SettingsPreferencesScreenNames;
	customAction?: HasCustomBehavior extends true ? () => void : null;
	preferenceName: string;
};

const SettingsPreferencesButton = <HasCustomBehavior extends boolean>({
	PreferenceIcon,
	fillIcon = false,
	hasCustomBehavior = false as HasCustomBehavior,
	preferenceScreen = (hasCustomBehavior ? null : SettingsPreferencesScreenNames.AccountManagement) as NonNullable<
		TProps<HasCustomBehavior>["preferenceScreen"]
	>,
	customAction = (hasCustomBehavior ? null : () => {}) as NonNullable<TProps<HasCustomBehavior>["customAction"]>,
	preferenceName,
}: TProps<HasCustomBehavior>) => {
	const navigation =
		useNavigation<NavigationProp<SettingsPreferencesNavigationStackTypes, SettingsPreferencesScreenNames>>();
	const [isBeingPressed, setIsBeingPressed] = useState(false);
	const presentationColor = isBeingPressed ? "#f10065" : "#000";

	return (
		<TouchableOpacity
			style={styles.container}
			onPressIn={() => setIsBeingPressed(true)}
			onPressOut={() => setIsBeingPressed(false)}
			onPress={
				hasCustomBehavior
					? () => {
							if (!customAction) return;
							customAction();
					  }
					: () => {
							if (!preferenceScreen) return;
							navigation.navigate(preferenceScreen as SettingsPreferencesScreenNames);
					  }
			}
		>
			<View style={styles.container__iconContainer}>
				<PreferenceIcon
					width={25}
					// height={50}
					style={styles.container__iconContainer__icon}
					color={presentationColor}
					stroke={presentationColor}
					fill={fillIcon ? presentationColor : undefined}
				/>
			</View>
			<Text style={cx(styles.container__text, { color: presentationColor })}>{preferenceName}</Text>
		</TouchableOpacity>
	);
};

export default React.memo(SettingsPreferencesButton);
