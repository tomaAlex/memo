import React from "react";
import { View } from "react-native";
import { CircleIcon } from "icons/index";
import styles from "./MainScreenIcon.module.scss";
import { SvgProps } from "react-native-svg";

type TProps = {
	focused: boolean;
	color: string;
	ScreenIcon: React.FC<SvgProps>;
};

const MainScreenIcon = ({ focused, color, ScreenIcon }: TProps) => {
	return (
		<View>
			{ScreenIcon({ width: 25, height: 25, color: color, fill: color })}
			{focused && (
				<CircleIcon style={styles.circleContainer} width={10} height={10} color={color} stroke={color} fill={color} />
			)}
		</View>
	);
};

export default React.memo(MainScreenIcon);
