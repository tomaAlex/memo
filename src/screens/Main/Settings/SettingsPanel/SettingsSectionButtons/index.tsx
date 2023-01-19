import React from "react";
import { View } from "react-native";
import { CameraPlus, EditIcon, SettingsIcon } from "icons/index";
import ContainedSettingsSectionButton from "./ContainedSettingsSectionButton";
import styles from "./SettingsSectionButtons.module.scss";
import { SettingsScreenNames } from "types/index";

const SettingsSectionButtons = () => {
	return (
		<View style={styles.container}>
			<ContainedSettingsSectionButton SectionIcon={CameraPlus} sectionScreen={SettingsScreenNames.Photos} />
			<ContainedSettingsSectionButton SectionIcon={EditIcon} sectionScreen={SettingsScreenNames.Information} />
			<ContainedSettingsSectionButton SectionIcon={SettingsIcon} sectionScreen={SettingsScreenNames.Preferences} />
		</View>
	);
};

export default React.memo(SettingsSectionButtons);
