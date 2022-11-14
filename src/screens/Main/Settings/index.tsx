import React from "react";
import { Keyboard, SafeAreaView, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { useUserUpdateFormValidationRules } from "hooks/index";
import { MainScreenNames, ScreenProps } from "types/index";
import connector from "../../../redux/connector";
import { Formik } from "formik";
import FormSubmitButton from "components/forms/FormSubmitButton";
import UpdateIdentificationForm from "./UpdateIdentificationForm";
import UpdateDetailsForm from "./UpdateDetailsForm";
import UpdateEmbodimentForm from "./UpdateEmbodimentForm";

const Settings = ({
	user: { firstName, lastName, gender, birthDate, job, school, description, location, height, orientation, photos },
}: ScreenProps<MainScreenNames.Settings>) => {
	const userUpdateSchema = useUserUpdateFormValidationRules();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#F5FCFF" }}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<Formik
						validationSchema={userUpdateSchema}
						initialValues={{
							firstName,
							lastName,
							gender,
							birthDate,
							job,
							school,
							description,
							location,
							height,
							orientation,
							photos,
						}}
						onSubmit={(userUpdate) => {
							console.log(userUpdate);
						}}
					>
						<ScrollView style={{ width: "80%" }}>
							<UpdateIdentificationForm />
							<UpdateDetailsForm />
							<UpdateEmbodimentForm />
							<View style={{ marginTop: 50 }}>
								<FormSubmitButton />
							</View>
						</ScrollView>
					</Formik>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default connector(Settings);
