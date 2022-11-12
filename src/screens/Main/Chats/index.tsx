import React, { useEffect, useState } from "react";
import { Text, SafeAreaView, FlatList } from "react-native";
import { MainScreenNames, MatchPreview, ScreenProps } from "types/index";
import connector from "../../../redux/connector";
import MatchPreviewRow from "./MatchPreviewRow";
import fetchMatchPreviews from "./utils/fetchMatchPreviews";

const Chats = ({ navigation, user }: ScreenProps<MainScreenNames.Chats>) => {
	const [matchPreviews, setMatchPreviews] = useState([] as MatchPreview[]);
	const [areMatchPreviewsLoading, setAreMatchPreviewsLoading] = useState(true);
	const matchIds = user.matches;

	const loadMatchPreviews = async () => {
		const userMatchPreviews = await fetchMatchPreviews();
		setMatchPreviews(userMatchPreviews);
		setAreMatchPreviewsLoading(false);
	};

	useEffect(() => {
		loadMatchPreviews();
	}, [matchIds]);

	if (areMatchPreviewsLoading) {
		return <Text>Loading...</Text>;
	}

	if (matchPreviews.length === 0) {
		return <Text>No matches yet!</Text>;
	}

	return (
		<SafeAreaView>
			<FlatList data={matchPreviews} renderItem={({ item }) => <MatchPreviewRow {...item} />} />
		</SafeAreaView>
	);
};

export default connector(Chats);
