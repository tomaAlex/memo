import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Navigator from "./routes/NavigationStack";
import store from "./src/redux/store";
import { getAllRequiredPermissions } from "utils/index";
import Config from "react-native-config";
import { StripeProvider } from "@stripe/stripe-react-native";

const App: React.FunctionComponent = () => {
	useEffect(() => {
		getAllRequiredPermissions();
	}, []);

	return (
		<Provider store={store}>
			<StripeProvider publishableKey={Config.STRIPE_PUBLISHABLE_KEY as string}>
				<Navigator />
			</StripeProvider>
		</Provider>
	);
};

export default App;
