import { Formik } from "formik";
import { useMatchMessages } from "hooks/index";
import React from "react";
import { Image, KeyboardAvoidingView, SafeAreaView, Text, View } from "react-native";
import { ScreenNames, ScreenProps } from "types/index";
import connector from "../../redux/connector";
import MatchMessages from "./MatchMessages";
import MatchMessageTextBar from "./MatchMessages/MatchMessageTextBar";

const MatchChat = ({
	route: {
		params: { matchId, matchedUsers },
	},
	user,
}: ScreenProps<ScreenNames.MatchChat>) => {
	const matchedUser = matchedUsers[0];
	const { firstName, lastName } = matchedUser;
	const matchedUserName = `${firstName} ${lastName}`;
	// const matchReference = firebase.firestore().collection("matches").doc(matchId);
	const [messages, sendNewMessage] = useMatchMessages(matchId);

	return (
		<SafeAreaView>
			<KeyboardAvoidingView style={{ backgroundColor: "red" }}>
				<View style={{ alignSelf: "center", padding: 50, paddingTop: 20 }}>
					<Image source={{ uri: matchedUser.photos[0] }} style={{ width: 150, height: 150, borderRadius: 100 }} />
					<Text style={{ paddingTop: 10, alignSelf: "center" }}>{matchedUserName}</Text>
				</View>
				<MatchMessages messages={messages} />
				<MatchMessageTextBar sendMessage={sendNewMessage} />
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default connector(MatchChat);
