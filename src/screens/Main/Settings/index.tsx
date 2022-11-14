import React from "react";
import { SafeAreaView, Text } from "react-native";
import { MainScreenNames, ScreenProps } from "types/index";
import connector from "../../../redux/connector";

const Settings = ({ user }: ScreenProps<MainScreenNames.Settings>) => {
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#F5FCFF" }}>
			<Text>{user.firstName}</Text>
		</SafeAreaView>
	);
};

export default connector(Settings);
