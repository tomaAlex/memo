import React from "react";
import { Text, SafeAreaView, FlatList, View } from "react-native";
import { MainScreenNames, ScreenProps } from "types/index";
import connector from "../../../redux/connector";
import MatchPreviewRow from "./MatchPreviewRow";
import { useMatchPreviewLoader } from "hooks/index";
import styles from "./Chats.module.scss";

const Chats = ({ user, matchPreviews, updateAllMatchPreviews, navigation }: ScreenProps<MainScreenNames.Chats>) => {
	const areMatchPreviewsLoading = useMatchPreviewLoader(user, updateAllMatchPreviews);

	if (areMatchPreviewsLoading) {
		return <Text>Loading...</Text>;
	}

	if (matchPreviews.length === 0) {
		return <Text>No matches yet!</Text>;
	}

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={matchPreviews}
				style={styles.container__list}
				ItemSeparatorComponent={() => <View style={styles.container__list__separator} />}
				renderItem={({ item }) => <MatchPreviewRow {...{ ...item, navigation }} />}
			/>
		</SafeAreaView>
	);
};

export default connector(Chats);
