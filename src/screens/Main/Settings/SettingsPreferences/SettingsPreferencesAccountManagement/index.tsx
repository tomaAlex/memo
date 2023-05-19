import React from "react";
import { View } from "react-native";
import connector from "redux/connector";
import { ScreenProps, SettingsPreferencesScreenNames } from "types";
import styles from "./SettingsPreferencesAccountManagement.module.scss";
import SearchFiltersForm from "screens/Main/Feed/SearchFiltersModal/SearchFiltersForm";
import DeleteAccountButton from "../../DeleteAccountButton";

const SettingsPreferencesAccountManagement = ({
	expandableRecommendations: [, , resetFilteredRecommendations],
}: ScreenProps<SettingsPreferencesScreenNames.AccountManagement>) => {
	return (
		<View style={styles.container}>
			<SearchFiltersForm resetRecommendations={resetFilteredRecommendations} />
			<DeleteAccountButton />
		</View>
	);
};

export default connector(SettingsPreferencesAccountManagement);
