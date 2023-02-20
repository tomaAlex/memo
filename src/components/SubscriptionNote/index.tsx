import React, { useState } from "react";
import { CloseIcon } from "icons";
import { View, Modal, Text, Platform } from "react-native";
import styles from "./Subscription.module.scss";

type TProps = {
	visible: boolean;
	onRequestClose: () => void;
};

const getSubscriptionsText = () => {
	return "Buy Premium Now! \nand get:";
};

const getLikeText = () => {
	return ". See who liked you.";
};

const getSeenByText = () => {
	return ". Read tick on messages.";
};

const getNoAdsText = () => {
	return ". No ads.";
};

const SubsciptionNote = ({ visible, onRequestClose }: TProps) => {
	return (
		<Modal visible={visible} animationType="slide" onRequestClose={onRequestClose}>
			<View style={[styles.container, Platform.OS === "android" && { height: "35%" }]}>
				<View style={styles.container__header}>
					<CloseIcon fill={"white"} onPress={onRequestClose} height={30} width={30} />
				</View>
				<View style={styles.container__textView}>
					<Text style={styles.container__textView__text}>{getSubscriptionsText()}</Text>
					<Text style={styles.container__textView__text}>{getLikeText()}</Text>
					<Text style={styles.container__textView__text}>{getSeenByText()}</Text>
					<Text style={styles.container__textView__text}>{getNoAdsText()}</Text>
				</View>
			</View>
		</Modal>
	);
};

export default React.memo(SubsciptionNote) as unknown as typeof SubsciptionNote;
