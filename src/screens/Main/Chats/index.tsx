import React, { useState } from "react";
import { Text, SafeAreaView, FlatList, View } from "react-native";
import { MainScreenNames, ScreenProps } from "types/index";
import connector from "../../../redux/connector";
import MatchPreviewRow from "./MatchPreviewRow";
import { useMatchPreviewLoader } from "hooks/index";
import { useTranslation } from "react-i18next";
import styles from "./Chats.module.scss";
import ChatLoading from "Loading/ChatLoading";

const Chats = (props: ScreenProps<MainScreenNames.Chats>) => {
	const { user, matchPreviews, updateAllMatchPreviews, navigation } = props;
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Chats" });
	const areMatchPreviewsLoading = useMatchPreviewLoader(user, updateAllMatchPreviews);
	const hasNoMatches = !areMatchPreviewsLoading && matchPreviews.length === 0;
	const shouldDisplayLoadingIndicator = areMatchPreviewsLoading && hasNoMatches;

	if (shouldDisplayLoadingIndicator) {
		return (
			<View style={styles.loadingContainer}>
				<ChatLoading heigth={350} width={350} />
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			{hasNoMatches && <Text style={styles.container__note}>{t("noMatchesNote")} 💘</Text>}
			<FlatList
				data={matchPreviews}
				style={styles.container__list}
				ItemSeparatorComponent={() => <View style={styles.container__list__separator} />}
				renderItem={({ item }) => <MatchPreviewRow {...{ ...item, ...props }} />}
			/>
		</SafeAreaView>
	);
};

export default connector(Chats);
