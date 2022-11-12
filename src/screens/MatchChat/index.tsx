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
	updateMatchPreviewLastMessage,
}: ScreenProps<ScreenNames.MatchChat>) => {
	const matchedUser = matchedUsers[0];
	const { firstName, lastName } = matchedUser;
	const matchedUserName = `${firstName} ${lastName}`;
	const [messages, sendNewMessage] = useMatchMessages(matchId, updateMatchPreviewLastMessage);

	return (
		<SafeAreaView>
			<KeyboardAvoidingView style={{ backgroundColor: "blue" }}>
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
