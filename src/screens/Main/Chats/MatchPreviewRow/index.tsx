import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { MatchPreview } from "types/index";

const MatchPreviewRow = ({ id, matchedUsers, lastMessage }: MatchPreview) => {
	const matchedUser = matchedUsers[0];
	const messagePreview = lastMessage ? lastMessage.content : "Be first to send a message!";
	const { firstName, lastName } = matchedUser;
	const matchedUserName = `${firstName} ${lastName}`;

	return (
		<TouchableOpacity
			style={{
				display: "flex",
				flexDirection: "row",
				backgroundColor: "gray",
				margin: 10,
				padding: 10,
				borderRadius: 10,
				justifyContent: "space-around",
			}}
		>
			<Image
				style={{ width: 50, height: 50, borderRadius: 100 }}
				key={`${matchedUser.id}-matchProfilePreview`}
				source={{ uri: matchedUser.photos[0] }}
			/>
			<View>
				<Text style={{ alignSelf: "center", color: "white" }}>{matchedUserName}</Text>
				<Text style={{ color: "white" }}>{messagePreview}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default React.memo(MatchPreviewRow);
