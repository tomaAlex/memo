import React, { useEffect } from "react";
import { Text, SafeAreaView, FlatList, View } from "react-native";
import { MainScreenNames, ScreenProps } from "types/index";
import connector from "../../../redux/connector";
import MatchPreviewRow from "./MatchPreviewRow";
import { useMatchPreviewLoader } from "hooks/index";
import { useTranslation } from "react-i18next";
import styles from "./Chats.module.scss";

const Chats = ({ user, matchPreviews, updateAllMatchPreviews, navigation }: ScreenProps<MainScreenNames.Chats>) => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Chats" });
	const areMatchPreviewsLoading = useMatchPreviewLoader(user, updateAllMatchPreviews);
	const hasNoMatches = !areMatchPreviewsLoading && matchPreviews.length === 0;
	const shouldDisplayLoadingIndicator = areMatchPreviewsLoading && hasNoMatches;

	console.log({ matchPreviews, areMatchPreviewsLoading, hasNoMatches, shouldDisplayLoadingIndicator });

	useEffect(() => {
		console.log({ matchPreviews });
	}, [matchPreviews]);

	return (
		<SafeAreaView style={styles.container}>
			{shouldDisplayLoadingIndicator && <Text style={styles.container__note}>⌛...</Text>}
			{hasNoMatches && <Text style={styles.container__note}>{t("noMatchesNote")} 💘</Text>}
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
