import FormSubmitButton from "components/forms/FormSubmitButton";
import FormTextInput from "components/forms/FormTextInput";
import { Formik } from "formik";
import { useMatchMessageTextBarFormValidationRules } from "hooks";
import { SendArrow } from "icons/index";
import React, { useState } from "react";
import { Platform, View } from "react-native";
import styles from "./MatchMessageTextBar.module.scss";

type TProps = {
	sendMessage: (message: string) => Promise<void>;
	createAwaitingMessage: (message: string) => void;
	clearAwaitingMessage: () => void;
	markTyping: () => void;
};

const isMessageEmpty = (message: string) => message === "";

const MatchMessageTextBar = ({ sendMessage, createAwaitingMessage, clearAwaitingMessage, markTyping }: TProps) => {
	const matchMessageTextBarSchema = useMatchMessageTextBarFormValidationRules();
	const [isMessageSending, setIsMessageSending] = useState(false);

	// var Sound = require("react-native-sound");

	// // Enable playback in silence mode
	// Sound.setCategory("Playback");

	// var sendSound = new Sound("send.mp3", Sound.MAIN_BUNDLE, () => {
	// 	// Play the sound with an onEnd callback
	// 	sendSound.play();
	// });

	return (
		<Formik
			validationSchema={matchMessageTextBarSchema}
			initialValues={{
				messageText: "",
			}}
			onSubmit={async ({ messageText }, formikProps) => {
				formikProps.resetForm();
				// setIsMessageSending(true);
				createAwaitingMessage(messageText);
				await sendMessage(messageText);
				clearAwaitingMessage();
				// sendSound.play();
				// setIsMessageSending(false);
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
							enablesReturnKeyAutomatically
							containerStyle={styles.container__messageBar__inputContainer}
							onChange={markTyping}
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
