import { checkWhetherFieldHasChanged } from "../../../utils";

const checkForNewMatchPossibility = (beforeChangeUserData: User, afterChangeUserData: User) => {
	return checkWhetherFieldHasChanged(beforeChangeUserData, afterChangeUserData, "likes");
};

export default checkForNewMatchPossibility;
