import React from "react";
import { TouchableOpacity } from "react-native";
import { SvgProps } from "react-native-svg";
import { SettingsNavigationStackTypes, SettingsScreenNames } from "types/index";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import styles from "./SettingsSectionButton.module.scss";

type TProps = {
	SectionIcon: React.FC<SvgProps>;
	sectionScreen: SettingsScreenNames;
};

const SettingsSectionButton = ({ SectionIcon, sectionScreen }: TProps) => {
	const navigation = useNavigation<NavigationProp<SettingsNavigationStackTypes, SettingsScreenNames>>();

	return (
		<TouchableOpacity style={styles.container} onPress={() => navigation.navigate(sectionScreen)}>
			<SectionIcon style={styles.container__icon} color={"white"} fill={"white"} />
		</TouchableOpacity>
	);
};

export default React.memo(SettingsSectionButton);
