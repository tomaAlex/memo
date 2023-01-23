import FormSubmitButton from "components/forms/FormSubmitButton";
import FormTextInput from "components/forms/FormTextInput";
import { Formik } from "formik";
import { useMatchMessageTextBarFormValidationRules } from "hooks";
import { SendArrow } from "icons/index";
import React, { useRef, useState } from "react";
import { Keyboard, Platform, TextInput, TextInputProps, View } from "react-native";
import styles from "./MatchMessageTextBar.module.scss";

type TProps = {
	sendMessage: (message: string) => Promise<void>;
};

const isMessageEmpty = (message: string) => message === "";

const MatchMessageTextBar = ({ sendMessage }: TProps) => {
	const matchMessageTextBarSchema = useMatchMessageTextBarFormValidationRules();
	const [isMessageSending, setIsMessageSending] = useState(false);
	let refT = useRef<TextInput | null>(null);

	return (
		<Formik
			validationSchema={matchMessageTextBarSchema}
			initialValues={{
				messageText: "",
			}}
			onSubmit={async ({ messageText }, formikProps) => {
				setIsMessageSending(true);
				sendMessage(messageText);
				formikProps.resetForm();
				setIsMessageSending(false);
			}}
		>
			{({ values }) => (
				<View style={styles.container}>
					<View style={styles.container__messageBar}>
						<FormTextInput
							editable={!isMessageSending}
							field="messageText"
							placeholder="Type message..."
							blurOnSubmit={false}
							style={
								Platform.OS === "ios"
									? styles.container__messageBar__textInputIOS
									: styles.container__messageBar__textInputAndroid
							}
							multiline={true}
							containerStyle={styles.container__messageBar__inputContainer}
						/>
					</View>
					<FormSubmitButton
						style={styles.container__submitButton}
						disabled={isMessageEmpty(values.messageText) ? true : false}
					>
						<SendArrow width={25} height={25} fill={"#0047FE"} opacity={isMessageEmpty(values.messageText) ? 0.5 : 1} />
					</FormSubmitButton>
				</View>
			)}
		</Formik>
	);
};

export default React.memo(MatchMessageTextBar);
