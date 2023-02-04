import React from "react";
import UsersSwiperOverlay from "../UsersSwiperOverlay";

const buildOverlayJsonComponent = (backgroundColor: string, caption: string) => {
	return {
		element: <UsersSwiperOverlay {...{ backgroundColor, caption }} />,
		style: {
			wrapper: {
				zIndex: 10,
			},
		},
	};
};

export default buildOverlayJsonComponent;
