import Geolocation from "@react-native-community/geolocation";

const handleLocationCollectionConfiguration = () => {
	Geolocation.setRNConfiguration({
		skipPermissionRequests: false,
		authorizationLevel: "whenInUse",
	});
};

export default handleLocationCollectionConfiguration;
