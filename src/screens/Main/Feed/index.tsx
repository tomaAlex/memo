import React from "react";
import { Alert, SafeAreaView } from "react-native";
import Swiper from "react-native-deck-swiper";
import { Gender, MainScreenNames, Orientation, ScreenProps, User } from "types/index";
import connector from "../../../redux/connector";
import FeedUserCard from "./FeedUserCard";

const Feed = ({ navigation, user }: ScreenProps<MainScreenNames.Feed>) => {
	const recommendations: User[] = [
		{
			firstName: "John",
			lastName: "Doe",
			birthDate: new Date("1990-01-01"),
			job: "Software Engineer",
			school: "University of California, Berkeley",
			description: "I like to code",
			location: {
				city: "San Francisco",
				state: "California",
				country: "United States",
			},
			photos: [
				"https://www.unique.dk/wp-content/uploads/2015/02/AS23_0697-e1500022025638-712x916.jpg",
				"https://i1.wp.com/fashionablymale.net/wp-content/uploads/2014/01/anthony-montaronimg_5890.jpg?resize=778%2C1166",
				"https://3.bp.blogspot.com/-amo07rMR4dE/V4L4-L-J8qI/AAAAAAABptE/6GHhoDWCCAAd_HIllpVwy7OKD4PM4bGYQCLcB/s1600/karolis-and-matis-by-karim-konrad-for-fashionably-male268.jpg",
			],
			gender: Gender.MALE,
			orientation: Orientation.BI,
		},
		{
			firstName: "Olivia",
			lastName: "Doe",
			birthDate: new Date("2001-11-04"),
			job: "Bus Driver",
			description: "I like to drive buses",
			location: {
				city: "San Francisco",
				state: "California",
				country: "United States",
			},
			photos: [
				"https://www.bookmodels.com/include/image_delivery_profile_lg.php?id=107941_LG_04.jpg",
				"https://i.pinimg.com/736x/56/f2/db/56f2db632c1c13aef5672f502c5a0cde.jpg",
				"https://photos.modelmayhem.com/photos/200618/18/5eec12a2a1f7d.jpg",
			],
			gender: Gender.FEMALE,
			orientation: Orientation.HETERO,
		},
		{
			firstName: "Jane",
			lastName: "Doe",
			birthDate: new Date("2000-10-09"),
			job: "Hair Stylist",
			school: "University of California, Berkeley",
			description: "I like to cut hair",
			location: {
				city: "San Francisco",
				state: "California",
				country: "United States",
			},
			photos: [
				"https://i.pinimg.com/originals/f2/af/a8/f2afa8b7fa0aebb4cffd40a6d652eb29.jpg",
				"https://i.pinimg.com/originals/92/ed/d8/92edd8edf6f1a96100d6ae55d8fc854f.jpg",
				"https://i.pinimg.com/originals/d2/04/d2/d204d2ac6c80cdd5b7093311a73b0542.jpg",
			],
			gender: Gender.FEMALE,
			orientation: Orientation.HETERO,
		},
	];

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#F5FCFF" }}>
			<Swiper<User>
				cards={recommendations}
				renderCard={(userToDisplay) => <FeedUserCard {...{ userToDisplay }} />}
				onSwipedRight={(userIndex) => {
					const likedUser = recommendations[userIndex];
					Alert.alert("Liked", `${likedUser.firstName}`);
				}}
				onSwipedLeft={(userIndex) => {
					const dislikedUser = recommendations[userIndex];
					Alert.alert("Disliked", `${dislikedUser.firstName}`);
				}}
				onSwipedTop={(userIndex) => {
					const superLikedUser = recommendations[userIndex];
					Alert.alert("Super Liked", `${superLikedUser.firstName}`);
				}}
				onSwipedAll={() => {
					Alert.alert("Fetching more recommendations!");
				}}
				cardIndex={0}
				stackSize={1}
			/>
		</SafeAreaView>
	);
};

export default connector(Feed);
