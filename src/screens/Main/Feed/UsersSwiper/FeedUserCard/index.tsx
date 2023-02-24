import React from "react";
import Carousel from "components/Carousel";
import { Image, View } from "react-native";
import { IdentifiedUser } from "types/index";
import styles from "./FeedUserCard.module.scss";
import FeedUserCardDescription from "./FeedUserCardDescription";
import FeedUserCardDistance from "./FeedUserCardDistance";
// import FeedUserCardShadow from "./FeedUserCardShadow";
import SwipeControls from "./SwipeControls";

type TProps = {
	userToDisplay: IdentifiedUser;
	fullScreen?: boolean;
};

const FeedUserCard = ({ userToDisplay, fullScreen }: TProps) => {
	const { photos, hasInstantMatchingOn } = userToDisplay;
	return (
		<View style={[styles.userCardContainer, fullScreen ? { height: "100%" } : {}]}>
			<View style={styles.userCardContainer__userCard}>
				<Carousel
					displayIndex
					hideNavigationControls
					showOverlaidNavigation={{ value: true, deactivateWhenLast: false }}
					style={styles.userCardContainer__userCard__carousel}
				>
					{photos.map((photo, photoIndex) => (
						<View style={styles.userCardContainer__userCard__carousel__imagePreviewContainer} key={photoIndex}>
							<Image
								style={styles.userCardContainer__userCard__carousel__imagePreviewContainer__imagePreview}
								key={photoIndex}
								source={{ uri: photo }}
							/>
							<FeedUserCardDistance likedUserLocation={userToDisplay.coordinates} />
							<FeedUserCardDescription userToDisplay={userToDisplay} />
						</View>
					))}
				</Carousel>
			</View>
			{/* <FeedUserCardShadow /> */}
			<SwipeControls {...{ hasInstantMatchingOn }} />
		</View>
	);
};

export default React.memo(FeedUserCard);
