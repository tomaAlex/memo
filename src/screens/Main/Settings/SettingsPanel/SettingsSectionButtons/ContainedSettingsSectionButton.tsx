import React from "react";
import { Platform, View } from "react-native";
import SettingsSectionButton from "./SettingsSectionButton";
import styles from "./SettingsSectionButtons.module.scss";

type SettingsSectionButtonProps = React.ComponentProps<typeof SettingsSectionButton>;

const ContainedSettingsSectionButton = (props: SettingsSectionButtonProps) => {
	return (
		<View style={[styles.container__button, Platform.OS === "android" && { height: "25%" }]}>
			<SettingsSectionButton {...props} />
		</View>
	);
};

export default React.memo(ContainedSettingsSectionButton);
