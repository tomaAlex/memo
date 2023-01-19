import React from "react";
import { Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectAge, selectFullName, selectUser } from "redux/selectors";
import styles from "./SettingsUserPreviewHeader.module.scss";

const SettingsUserPreviewHeader = () => {
	const { photos } = useSelector(selectUser);
	const fullName = useSelector(selectFullName);
	const age = useSelector(selectAge);

	return (
		<View style={styles.container}>
			<Image style={styles.container__profile} source={{ uri: photos[0] }} />
			<View style={styles.container__fullNameAndAgeContainer}>
				<Text style={styles.container__fullNameAndAgeContainer__fullName}>{fullName},</Text>
				<Text style={styles.container__fullNameAndAgeContainer__age}>{age}</Text>
			</View>
		</View>
	);
};

export default React.memo(SettingsUserPreviewHeader);
