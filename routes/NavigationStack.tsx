import React, { useEffect, useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ScreenNames, NavigationStackTypes, MemoryIDs } from "types/index";
import { getMemoryItem } from "utils";
import Observer from "screens/Observer";
import Login from "screens/Login";
import EmailLogin from "screens/EmailLogin";
import Identification from "screens/Signup/Identification";
import Details from "screens/Signup/Details";
import Embodiment from "screens/Signup/Embodiment";
import Main from "screens/Main";
import MatchChat from "screens/MatchChat";
import ProfilePreview from "screens/ProfilePreview";
import Tutorial from "screens/Tutorial";
import FirstName from "screens/Signup/FirstName";
import LastName from "screens/Signup/LastName";
import Birthdate from "screens/Signup/Birthdate";
import Gender from "screens/Signup/Gender";
import Orientation from "screens/Signup/Orientation";
import Height from "screens/Signup/Height";
import Work from "screens/Signup/Work";
import Description from "screens/Signup/Description";
import Photos from "screens/Signup/Photos";
import SignupConfirmation from "screens/Signup/SignupConfirmation";
import EULAWarning from "components/EULAWarning";
import InternetDisconnectedWarning from "components/InternetDisconnectedWarning";

const Stack = createStackNavigator<NavigationStackTypes>();

const Navigator = () => {
	const { isConnected } = useNetInfo();
	const [acceptedEULA, setAcceptedEULA] = useState(true);

	useEffect(() => {
		getMemoryItem(MemoryIDs.ACCEPTED_EULA).then((acceptedEULABefore) => {
			setAcceptedEULA(!!acceptedEULABefore);
		});
	}, []);

	if (!acceptedEULA) {
		return <EULAWarning {...{ setAcceptedEULA }} />;
	}

	if (!isConnected) {
		return <InternetDisconnectedWarning {...{ isConnected }} />;
	}

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={ScreenNames.Observer} screenOptions={{ headerShown: false }}>
				<Stack.Screen name={ScreenNames.Observer} component={Observer} />
				<Stack.Screen name={ScreenNames.Login} component={Login} />
				<Stack.Screen name={ScreenNames.EmailLogin} component={EmailLogin} />
				<Stack.Screen name={ScreenNames.Identification} component={Identification} />
				<Stack.Screen name={ScreenNames.FirstName} component={FirstName} />
				<Stack.Screen name={ScreenNames.LastName} component={LastName} />
				<Stack.Screen name={ScreenNames.BirthDate} component={Birthdate} />
				<Stack.Screen name={ScreenNames.Gender} component={Gender} />
				<Stack.Screen name={ScreenNames.Orientation} component={Orientation} />
				<Stack.Screen name={ScreenNames.Height} component={Height} />
				<Stack.Screen name={ScreenNames.Work} component={Work} />
				<Stack.Screen name={ScreenNames.Description} component={Description} />
				<Stack.Screen name={ScreenNames.Photos} component={Photos} />
				<Stack.Screen name={ScreenNames.SignupConfirmation} component={SignupConfirmation} />
				<Stack.Screen name={ScreenNames.Details} component={Details} />
				<Stack.Screen name={ScreenNames.Embodiment} component={Embodiment} />
				<Stack.Screen name={ScreenNames.Main} component={Main} />
				<Stack.Screen name={ScreenNames.MatchChat} component={MatchChat} />
				<Stack.Screen name={ScreenNames.ProfilePreview} component={ProfilePreview} />
				<Stack.Screen name={ScreenNames.Tutorial} component={Tutorial} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default React.memo(Navigator);
