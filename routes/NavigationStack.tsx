import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ScreenNames, NavigationStackTypes, ReduxProps } from "types/index";
import Observer from "screens/Observer";
import Login from "screens/Login";
import Identification from "screens/Signup/Identification";
import Details from "screens/Signup/Details";
import Embodiment from "screens/Signup/Embodiment";
import Main from "screens/Main";

const Stack = createStackNavigator<NavigationStackTypes>();

const Navigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName={ScreenNames.Observer} screenOptions={{ headerShown: false }}>
				<Stack.Screen name={ScreenNames.Observer} component={Observer} />
				<Stack.Screen name={ScreenNames.Login} component={Login} />
				<Stack.Screen name={ScreenNames.Identification} component={Identification} />
				<Stack.Screen name={ScreenNames.Details} component={Details} />
				<Stack.Screen name={ScreenNames.Embodiment} component={Embodiment} />
				<Stack.Screen name={ScreenNames.Main} component={Main} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default React.memo(Navigator);
