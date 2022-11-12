import FormSubmitButton from "components/forms/FormSubmitButton";
import FormTextInput from "components/forms/FormTextInput";
import { Formik } from "formik";
import { useMatchMessageTextBarFormValidationRules } from "hooks";
import React from "react";
import { View } from "react-native";

type TProps = {
	sendMessage: (message: string) => Promise<void>;
};

const MatchMessageTextBar = ({ sendMessage }: TProps) => {
	const matchMessageTextBarSchema = useMatchMessageTextBarFormValidationRules();

	return (
		<Formik
			validationSchema={matchMessageTextBarSchema}
			initialValues={{
				messageText: "",
			}}
			onSubmit={async ({ messageText }, formikProps) => {
				await sendMessage(messageText);
				formikProps.resetForm();
			}}
		>
			<View style={{ display: "flex", flexDirection: "row" }}>
				<View style={{ flex: 1 }}>
					<FormTextInput
						field="messageText"
						placeholder="Type message..."
						style={{ width: "100%", backgroundColor: "white" }}
					/>
				</View>
				<FormSubmitButton />
			</View>
		</Formik>
	);
};

export default React.memo(MatchMessageTextBar);
