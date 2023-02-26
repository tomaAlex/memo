import { firebase } from "@react-native-firebase/functions";

const fetchCollectionIds = async (collectionId: string): Promise<string[]> => {
	const { data } = await firebase.functions().httpsCallable("getCollectionIds")({ collectionId });
	return data as string[];
};

export default fetchCollectionIds;
