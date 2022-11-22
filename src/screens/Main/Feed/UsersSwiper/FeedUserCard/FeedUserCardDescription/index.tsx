import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { IdentifiedUser } from "types/index";
import styles from "../FeedUserCard.module.scss";
import FeedUserCardDescriptionText from "./FeedUserCardDescriptionText";

type TProps = {
	userToDisplay: IdentifiedUser;
};

const FeedUserCardDescription = ({
	userToDisplay: { firstName, lastName, birthDate, job, school, description, location },
}: TProps) => {
	const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
	const name = `${firstName} ${lastName}`;

	const [translateDetails] = useTranslation("translation", { keyPrefix: "Screens.Main.Feed.Details" });
	const locationCaption = location ? `${location.city}, ${location.country}` : undefined;

	return (
		<View style={styles.userCardContainer__userCard__descriptionContainer}>
			<FeedUserCardDescriptionText
				style={styles.userCardContainer__userCard__descriptionContainer__text__bold}
				text={name}
				hasEndingComma={true}
			/>
			<FeedUserCardDescriptionText text={`${age} ${translateDetails("years")}`} />
			<FeedUserCardDescriptionText text={description} />
			<FeedUserCardDescriptionText text={job} />
			<FeedUserCardDescriptionText text={school} />
			<FeedUserCardDescriptionText text={locationCaption} />
		</View>
	);
};

export default React.memo(FeedUserCardDescription);
