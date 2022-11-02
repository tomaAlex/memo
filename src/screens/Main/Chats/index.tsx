import React from "react";
import { Text, SafeAreaView } from "react-native";
import { MainScreenNames, ScreenProps } from "types/index";
import connector from "../../../redux/connector";

const Chats = ({ navigation }: ScreenProps<MainScreenNames.Chats>) => {
	return (
		<SafeAreaView>
			<Text>Chats screen</Text>
		</SafeAreaView>
	);
};

export default connector(Chats);
