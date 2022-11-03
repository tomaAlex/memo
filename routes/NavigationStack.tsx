import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { ScreenNames, NavigationStackTypes } from "types/index";
import { getAllRequiredPermissions } from "utils/index";
import Login from "screens/Login";
import Identification from "screens/Signup/Identification";
import Details from "screens/Signup/Details";
import Embodiment from "screens/Signup/Embodiment";
import Main from "screens/Main";

const Stack = createStackNavigator<NavigationStackTypes>();

export default class Navigator extends React.Component {
	public async componentDidMount() {
		await getAllRequiredPermissions();
	}
	public render() {
		return (
			<NavigationContainer>
				<Stack.Navigator initialRouteName={ScreenNames.Login} screenOptions={{ headerShown: false }}>
					<Stack.Screen name={ScreenNames.Login} component={Login} />
					<Stack.Screen name={ScreenNames.Identification} component={Identification} />
					<Stack.Screen name={ScreenNames.Details} component={Details} />
					<Stack.Screen name={ScreenNames.Embodiment} component={Embodiment} />
					<Stack.Screen name={ScreenNames.Main} component={Main} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}
