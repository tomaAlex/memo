import Carousel from "components/Carousel";
import React from "react";
import { Image, View } from "react-native";
import Swiper from "react-native-deck-swiper";
import { IdentifiedUser } from "types/index";
import styles from "./FeedUserCard.module.scss";
import FeedUserCardDescription from "./FeedUserCardDescription";
import FeedUserCardDistance from "./FeedUserCardDistance";
import FeedUserCardShadow from "./FeedUserCardShadow";
import SwipeControls from "./SwipeControls";

type TProps = {
	userToDisplay: IdentifiedUser;
	swiperReference: React.RefObject<Swiper<IdentifiedUser>>;
};

const FeedUserCard = ({ userToDisplay, swiperReference }: TProps) => {
	const { photos } = userToDisplay;
	return (
		<View style={styles.userCardContainer}>
			<View style={styles.userCardContainer__userCard}>
				<FeedUserCardDistance likedUserLocation={userToDisplay.coordinates} />
				<Carousel style={styles.userCardContainer__userCard__carousel}>
					{photos.map((photo, photoIndex) => (
						<Image
							style={styles.userCardContainer__userCard__carousel__imagePreview}
							key={photoIndex}
							source={{ uri: photo }}
						/>
					))}
				</Carousel>
				<FeedUserCardDescription userToDisplay={userToDisplay} />
			</View>
			<FeedUserCardShadow />
			<SwipeControls swiperReference={swiperReference} />
		</View>
	);
};

export default React.memo(FeedUserCard);
