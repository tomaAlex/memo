import React from "react";
import { RefreshIcon } from "icons";
import { cx } from "utils/index";
import { AwaitingMatchMessage } from "types";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./AwaitingMatchMessagePreview.module.scss";
import { useTranslation } from "react-i18next";

type TProps = {
	sendMessage: (message: string) => Promise<void>;
	updateFailureStatus: (failed: boolean) => void;
	clearSelf: () => void;
} & AwaitingMatchMessage;

const AwaitingMatchMessagePreview = ({
	content,
	failed = false,
	sendMessage,
	updateFailureStatus,
	clearSelf,
}: TProps) => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens.Main.MatchChat.AwaitingMatchMessagePreview" });
	return (
		<View style={styles.messageBubble}>
			<TouchableOpacity
				disabled={!failed}
				onPress={async () => {
					if (!failed) {
						return;
					}
					try {
						updateFailureStatus(false);
						await sendMessage(content);
						clearSelf();
					} catch (e) {
						console.log(e);
						updateFailureStatus(true);
					}
				}}
				style={cx(styles.messageBubbleGeneral, styles.messageBubble__message, [
					styles.messageBubble__messageFailed,
					failed,
				])}
			>
				<Text style={styles.messageBubble__message__content}>{content}</Text>
			</TouchableOpacity>
			<View style={styles.metadata}>
				<Text style={styles.metadata__caption}>{failed ? t("failed") : t("sendingMessage")}</Text>
				{failed && <RefreshIcon height={10} width={10} fill="#f00" style={styles.metadata__failed} />}
			</View>
		</View>
	);
};

export default React.memo(AwaitingMatchMessagePreview);
