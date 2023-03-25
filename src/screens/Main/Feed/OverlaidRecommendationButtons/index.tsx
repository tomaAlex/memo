import React from "react";
import { View } from "react-native";
import styles from "./OverlaidRecommendationButtons.module.scss";
import FlagButton, { TProps as FlagButtonProps } from "./FlagButton";
import SearchFiltersButton, { TProps as SearchFiltersButtonProps } from "./SearchFiltersButton";

type TProps = {
	searchFiltersButtonProps: SearchFiltersButtonProps;
	flagButtonProps?: FlagButtonProps;
	top?: number | string;
};

const OverlaidRecommendationButtons = ({ searchFiltersButtonProps, flagButtonProps, top }: TProps) => {
	return (
		<View style={[styles.container, top && { top }]}>
			<SearchFiltersButton {...searchFiltersButtonProps} />
			{flagButtonProps && <FlagButton {...flagButtonProps} />}
		</View>
	);
};

export default React.memo(OverlaidRecommendationButtons);
