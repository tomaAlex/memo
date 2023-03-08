import React from "react";
import Loading from "components/Loading";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { PlugDisconnected } from "icons/index";
import styles from "./InternetDisconnectedWarning.module.scss";

type TProps = {
	isConnected: false | null;
};

const InternetDisconnectedWarning = ({ isConnected }: TProps) => {
	const [t] = useTranslation("translation", { keyPrefix: "Screens" });
	const iconColor = "#F10065";

	if (isConnected === null) {
		// We don't know if the user is connected to the internet, so we wait for the answer
		return (
			<View style={styles.loadingContainer}>
				<Loading />
			</View>
		);
	}

	// The user is not connected to the internet, so we display a clear error message
	return (
		<View style={styles.loadingContainer}>
			<Text style={styles.error}>{t("noInternet")}</Text>
			<TouchableOpacity>
				<PlugDisconnected width={25} height={25} fill={iconColor} stroke={iconColor} color={iconColor} />
			</TouchableOpacity>
		</View>
	);
};

export default React.memo(InternetDisconnectedWarning);
