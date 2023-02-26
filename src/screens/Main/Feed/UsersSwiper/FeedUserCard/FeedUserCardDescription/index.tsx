import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useSelector } from "react-redux";
import { selectIsPremium, selectIsLiked, selectId } from "redux/selectors";
import { IdentifiedUser } from "types/index";
import { getAgeFromBirthDate } from "utils";
import styles from "../FeedUserCard.module.scss";
import FeedUserCardDescriptionText from "./FeedUserCardDescriptionText";

type TProps = {
	userToDisplay: IdentifiedUser;
};

const FeedUserCardDescription = ({
	userToDisplay: { firstName, lastName, birthDate, job, school, description, location, id, likes },
}: TProps) => {
	const isPremium = useSelector(selectIsPremium);
	const age = getAgeFromBirthDate(birthDate);
	const name = `${firstName} ${lastName}`;
	const [translateDetails] = useTranslation("translation", { keyPrefix: "Screens.Main.Feed.Details" });
	const locationCaption = location ? `${location.city}, ${location.country}` : undefined;
	const currentUserId = useSelector(selectId);
	const isCurrentUserLikedByGivenUser = () => likes.includes(currentUserId);

	const likedText = isPremium && isCurrentUserLikedByGivenUser() ? translateDetails("liked") : undefined;
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
			{likedText && (
				<FeedUserCardDescriptionText
					text={likedText}
					style={styles.userCardContainer__userCard__descriptionContainer__likedText}
				/>
			)}
		</View>
	);
};

export default React.memo(FeedUserCardDescription);
