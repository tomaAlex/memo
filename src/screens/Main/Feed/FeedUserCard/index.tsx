import Carousel from "components/Carousel";
import React from "react";
import { Image, Text, View } from "react-native";
import { User } from "types/index";

type TProps = {
	userToDisplay: User;
};

const FeedUserCard = ({
	userToDisplay: { firstName, birthDate, job, school, description, location, photos },
}: TProps) => {
	const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
	return (
		<View
			style={{
				flex: 1,
				borderRadius: 4,
				borderWidth: 2,
				borderColor: "#E8E8E8",
				justifyContent: "center",
				backgroundColor: "white",
			}}
		>
			<Carousel style={{ flex: 1 }}>
				{photos.map((photo, photoIndex) => (
					<Image style={{ flex: 1 }} key={photoIndex} source={{ uri: photo }} />
				))}
			</Carousel>
			<View
				style={{
					position: "absolute",
					backgroundColor: "rgba(0, 0, 0, 0.5)",
					width: "100%",
					alignItems: "center",
					bottom: "10%",
				}}
			>
				<Text style={{ color: "white" }}>{`${firstName} (${age} years old)`}</Text>
				{description && <Text style={{ color: "white" }}>{description}</Text>}
				{job && <Text style={{ color: "white" }}>{job}</Text>}
				{school && <Text style={{ color: "white" }}>{school}</Text>}
				{location && (
					<Text style={{ color: "white" }}>{`${location.city}, ${location.state}, ${location.country}`}</Text>
				)}
			</View>
		</View>
	);
};

export default React.memo(FeedUserCard);
