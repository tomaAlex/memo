import React from "react";
import { useSelector } from "react-redux";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { selectAge, selectFullName, selectUser } from "redux/selectors";
import styles from "./SettingsUserPreviewHeader.module.scss";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NavigationStackTypes, ScreenNames } from "types/index";

const SettingsUserPreviewHeader = () => {
	const { photos, id } = useSelector(selectUser);
	const fullName = useSelector(selectFullName);
	const age = useSelector(selectAge);
	const navigation = useNavigation<NavigationProp<NavigationStackTypes, ScreenNames>>();

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={() => navigation.navigate(ScreenNames.ProfilePreview, { userToPreviewId: id })}
		>
			<Image style={styles.container__profile} source={{ uri: photos[0] }} />
			<View style={styles.container__fullNameAndAgeContainer}>
				<Text style={styles.container__fullNameAndAgeContainer__fullName}>{fullName},</Text>
				<Text style={styles.container__fullNameAndAgeContainer__age}>{age}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default React.memo(SettingsUserPreviewHeader);
