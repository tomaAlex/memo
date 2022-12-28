import React from "react";
import { IdentifiedUser } from "types/index";
import Swiper from "react-native-deck-swiper";

const UsersSwiperContext = React.createContext<{
	swiperReference: React.RefObject<Swiper<IdentifiedUser>>;
	isSwiperBlocked: boolean;
	setIsSwiperBlocked: (isSwiperBlocked: boolean) => void;
	userToInstantlyMatchId: string;
}>({
	swiperReference: { current: null },
	isSwiperBlocked: false,
	setIsSwiperBlocked: () => {},
	userToInstantlyMatchId: "",
});

export default UsersSwiperContext;
