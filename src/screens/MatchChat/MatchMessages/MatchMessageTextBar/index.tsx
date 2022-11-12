import FormSubmitButton from "components/forms/FormSubmitButton";
import FormTextInput from "components/forms/FormTextInput";
import { Formik } from "formik";
import { useMatchMessageTextBarFormValidationRules } from "hooks";
import React, { useState } from "react";
import { View } from "react-native";

type TProps = {
	sendMessage: (message: string) => Promise<void>;
};

const MatchMessageTextBar = ({ sendMessage }: TProps) => {
	const matchMessageTextBarSchema = useMatchMessageTextBarFormValidationRules();
	const [isMessageSending, setIsMessageSending] = useState(false);

	return (
		<Formik
			validationSchema={matchMessageTextBarSchema}
			initialValues={{
				messageText: "",
			}}
			onSubmit={async ({ messageText }, formikProps) => {
				setIsMessageSending(true);
				await sendMessage(messageText);
				setIsMessageSending(false);
				formikProps.resetForm();
			}}
		>
			<View style={{ display: "flex", flexDirection: "row" }}>
				<View style={{ flex: 1 }}>
					<FormTextInput
						editable={!isMessageSending}
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
