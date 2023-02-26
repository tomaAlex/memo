import React from "react";
import { Text } from "react-native";
import { cx } from "utils/index";
import { User } from "types/index";
import Loading from "components/Loading";
import { useFormikContext } from "formik";
import { useUserChangedStatus } from "hooks/index";
import FormSubmitButton from "components/forms/FormSubmitButton";
import styles from "./SettingsSubmitButton.module.scss";

type TProps = {
	isUserUpdating: boolean;
};

const SettingsSubmitButton = ({ isUserUpdating }: TProps) => {
	const checkUserChangedStatus = useUserChangedStatus();
	const { values: updatedUser } = useFormikContext<User>();
	const didUserChange = checkUserChangedStatus(updatedUser);
	const isUserSame = !didUserChange;
	const isSubmitButtonDisabled = isUserSame || isUserUpdating;

	return (
		<FormSubmitButton
			style={cx(styles.container, [styles.container__disabled, isSubmitButtonDisabled])}
			disabled={isSubmitButtonDisabled}
		>
			{isUserUpdating ? <Loading height={25} width={25} /> : <Text style={styles.container__caption}>Update</Text>}
		</FormSubmitButton>
	);
};

export default React.memo(SettingsSubmitButton);
