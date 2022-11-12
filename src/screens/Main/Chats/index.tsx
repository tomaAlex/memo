import React, { useCallback, useEffect, useState } from "react";
import { Text, SafeAreaView, FlatList } from "react-native";
import { MainScreenNames, ScreenProps } from "types/index";
import connector from "../../../redux/connector";
import MatchPreviewRow from "./MatchPreviewRow";
import fetchMatchPreviews from "./utils/fetchMatchPreviews";

const Chats = ({ user, matchPreviews, updateAllMatchPreviews, navigation }: ScreenProps<MainScreenNames.Chats>) => {
	const [areMatchPreviewsLoading, setAreMatchPreviewsLoading] = useState(true);
	const matchIds = user.matches;

	const loadMatchPreviews = useCallback(async () => {
		const userMatchPreviews = await fetchMatchPreviews();
		updateAllMatchPreviews(userMatchPreviews);
		setAreMatchPreviewsLoading(false);
	}, [updateAllMatchPreviews]);

	useEffect(() => {
		loadMatchPreviews();
	}, [matchIds, loadMatchPreviews]);

	if (areMatchPreviewsLoading) {
		return <Text>Loading...</Text>;
	}

	if (matchPreviews.length === 0) {
		return <Text>No matches yet!</Text>;
	}

	return (
		<SafeAreaView>
			<FlatList data={matchPreviews} renderItem={({ item }) => <MatchPreviewRow {...{ ...item, navigation }} />} />
		</SafeAreaView>
	);
};

export default connector(Chats);
