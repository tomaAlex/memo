import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MainScreenNames, MatchPreview, ScreenProps } from "types/index";
import styles from "./MatchedNoteContent.module.scss";
import getChatNavigator from "./utils/getChatNavigator";

type TProps = {
	matchPreviewToNote: MatchPreview;
	closeMatchedNote: () => void;
	navigation: ScreenProps<MainScreenNames.Feed>["navigation"];
};

const MatchedNote = ({ matchPreviewToNote, closeMatchedNote, navigation }: TProps) => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.Feed.MatchedNote" });

	const autoClosingSecondsTimeout = 5;
	setTimeout(closeMatchedNote, autoClosingSecondsTimeout * 1000);
	const { photos } = matchPreviewToNote.matchedUsers[0];

	return (
		<TouchableWithoutFeedback onPress={closeMatchedNote}>
			<View style={styles.container}>
				<View style={styles.container__profilePreview}>
					<Image style={styles.container__profilePreview__image} source={{ uri: photos[0] }} />
					<View style={styles.container__profilePreview__image__overlay} />
				</View>
				<View style={styles.container__controlsPreview}>
					<Text style={styles.container__controlsPreview__title}>{t("matchedTitle")}</Text>
					<TouchableOpacity
						style={styles.container__controlsPreview__startConversationButton}
						onPress={getChatNavigator(navigation, matchPreviewToNote, closeMatchedNote)}
					>
						<Text style={styles.container__controlsPreview__startConversationButton__caption}>
							{t("startConversation")}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default React.memo(MatchedNote);
