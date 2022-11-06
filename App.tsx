import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Navigator from "./routes/NavigationStack";
import store from "./src/redux/store";
import { getAllRequiredPermissions } from "utils/index";

const App: React.FunctionComponent = () => {
	useEffect(() => {
		getAllRequiredPermissions();
	}, []);

	return (
		<Provider store={store}>
			<Navigator />
		</Provider>
	);
};

export default App;
