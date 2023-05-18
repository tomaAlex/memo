import React from "react";
import { Text, SafeAreaView, FlatList, View } from "react-native";
import { MainScreenNames, ScreenProps } from "types/index";
import connector from "../../../redux/connector";
import MatchPreviewRow from "./MatchPreviewRow";
import { useMatchPreviewLoader } from "hooks/index";
import { useTranslation } from "react-i18next";
import styles from "./Chats.module.scss";
import ChatLoading from "Loading/ChatLoading";
import { MAXIMUM_MATCHES } from "constants/index";

const Chats = (props: ScreenProps<MainScreenNames.Chats>) => {
	const { user, matchPreviews, updateAllMatchPreviews, navigation } = props;
	const matchesNumber = matchPreviews.length;
	const leftMatchesNumber = MAXIMUM_MATCHES - matchesNumber;
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Chats" });
	const areMatchPreviewsLoading = useMatchPreviewLoader(user, updateAllMatchPreviews);
	const hasNoMatches = !areMatchPreviewsLoading && matchesNumber === 0;

	if (areMatchPreviewsLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ChatLoading heigth={350} width={350} />
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.container__header}>{t("leftMatchesNote", { count: leftMatchesNumber })} 🔥</Text>
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
