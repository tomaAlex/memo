import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { SvgProps } from "react-native-svg";
import { SettingsNavigationStackTypes, SettingsScreenNames } from "types/index";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import styles from "./SettingsSectionButton.module.scss";

type TProps = {
	SectionIcon: React.FC<SvgProps>;
	sectionScreen: SettingsScreenNames;
	sectionName: string;
};

const SettingsSectionButton = ({ SectionIcon, sectionScreen, sectionName }: TProps) => {
	const navigation = useNavigation<NavigationProp<SettingsNavigationStackTypes, SettingsScreenNames>>();

	return (
		<TouchableOpacity style={styles.mainContainer} onPress={() => navigation.navigate(sectionScreen)}>
			<View style={styles.mainContainer__buttonContainer}>
				<SectionIcon style={styles.mainContainer__buttonContainer__icon} color={"white"} fill={"white"} />
			</View>
			<Text style={styles.mainContainer__text}>{sectionName}</Text>
		</TouchableOpacity>
	);
};

export default React.memo(SettingsSectionButton);
