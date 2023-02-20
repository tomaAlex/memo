import React, { useRef } from "react";
import { SafeAreaView, View } from "react-native";
import connector from "../../redux/connector";
import Swiper from "react-native-deck-swiper";
import Loading from "components/Loading";
import { useSnapshot } from "hooks/index";
import FeedUserCard from "screens/Main/Feed/UsersSwiper/FeedUserCard";
import { IdentifiedUser, ScreenNames, ScreenProps, User } from "types/index";
import UsersSwiperContext from "screens/Main/Feed/UsersSwiper/UsersSwiperContext";
import styles from "./ProfilePreview.module.scss";
import BackButton from "components/BackButton";

const ProfilePreview = ({
	route: {
		params: { userToPreviewId },
	},
	navigation,
}: ScreenProps<ScreenNames.ProfilePreview>) => {
	const [userToPreview] = useSnapshot<User>("users", userToPreviewId);
	const isUserLoading = !userToPreview;
	const swiperReference = useRef<Swiper<IdentifiedUser>>(null);
	const identifiedUserToPreview = { ...userToPreview, id: userToPreviewId } as IdentifiedUser;

	if (isUserLoading) {
		return (
			<View style={styles.loadingContainer}>
				<Loading />
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<UsersSwiperContext.Provider
				value={{
					swiperReference,
					isSwiperBlocked: true,
					setIsSwiperBlocked: () => {},
					userToInstantlyMatchId: "",
					setSwipedAllUsers: () => {},
				}}
			>
				<Swiper<IdentifiedUser>
					ref={swiperReference}
					backgroundColor="white"
					cards={[identifiedUserToPreview]}
					cardStyle={{ flex: 1, width: "100%", height: "80%", top: "10%", left: 0 }}
					renderCard={(userToDisplay) => <FeedUserCard {...{ userToDisplay, fullScreen: true }} />}
					horizontalSwipe={false}
					verticalSwipe={false}
					cardIndex={0}
					stackSize={1}
				/>
			</UsersSwiperContext.Provider>
			<BackButton navigation={navigation} />
		</SafeAreaView>
	);
};

export default connector(ProfilePreview);
