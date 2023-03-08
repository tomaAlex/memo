import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Navigator from "./routes/NavigationStack";
import store from "./src/redux/store";
import { getAllRequiredPermissions } from "utils/index";
import Config from "react-native-config";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useNetInfo } from "@react-native-community/netinfo";
import InternetDisconnectedWarning from "components/InternetDisconnectedWarning";

const App: React.FunctionComponent = () => {
	const { isConnected } = useNetInfo();

	useEffect(() => {
		getAllRequiredPermissions();
	}, []);

	if (!isConnected) {
		return <InternetDisconnectedWarning {...{ isConnected }} />;
	}

	return (
		<Provider store={store}>
			<StripeProvider
				publishableKey={Config.STRIPE_PUBLISHABLE_KEY as string}
				threeDSecureParams={{
					timeout: 10,
				}}
			>
				<Navigator />
			</StripeProvider>
		</Provider>
	);
};

export default App;
