import React, { useCallback, useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";

type TProps = {
	animationInterval?: number;
	fontSize?: number;
};

const Loading = ({ animationInterval = 1000, fontSize = 30 }: TProps) => {
	const [dotsCount, setDotsCount] = useState(0);
	const intervalReference = React.useRef<NodeJS.Timeout>();
	const dots = "🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛";

	const cleanUpInterval = () => {
		const { current } = intervalReference;
		if (!current) {
			return;
		}
		clearInterval(current);
	};

	const setDotsUpdatingInterval = useCallback(() => {
		intervalReference.current = setInterval(() => {
			setDotsCount((currentDotsCount) => {
				return (currentDotsCount + 2) % dots.length;
			});
		}, animationInterval);
	}, [animationInterval]);

	useEffect(() => cleanUpInterval, []);
	useEffect(() => {
		cleanUpInterval();
		setDotsUpdatingInterval();
	}, [setDotsUpdatingInterval]);

	return (
		<TouchableOpacity>
			<Text style={{ fontSize }}>{dots.slice(dotsCount, dotsCount + 2)}</Text>
		</TouchableOpacity>
	);
};

export default React.memo(Loading);
