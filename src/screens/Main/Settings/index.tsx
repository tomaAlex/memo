import React, { useState } from "react";
import { Keyboard, SafeAreaView, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { useUserUpdateFormValidationRules } from "hooks/index";
import { MainScreenNames, ScreenProps, User } from "types/index";
import connector from "../../../redux/connector";
import { Formik } from "formik";
import FormSubmitButton from "components/forms/FormSubmitButton";
import UpdateIdentificationForm from "./UpdateIdentificationForm";
import UpdateDetailsForm from "./UpdateDetailsForm";
import UpdateEmbodimentForm from "./UpdateEmbodimentForm";
import { updateUser as firebaseUpdateUser } from "Firebase/index";
import store from "redux/store";

const Settings = ({
	user: { firstName, lastName, gender, birthDate, job, school, description, location, height, orientation, photos, id },
}: ScreenProps<MainScreenNames.Settings>) => {
	const userUpdateSchema = useUserUpdateFormValidationRules();
	const locationCountry = location?.country;
	const locationState = location?.state;
	const locationCity = location?.city;
	const [isUserUpdating, setIsUserUpdating] = useState(false);

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
							locationCountry,
							locationState,
							locationCity,
							height,
							orientation,
							photos,
						}}
						onSubmit={async (userUpdate) => {
							setIsUserUpdating(true);
							await firebaseUpdateUser(store.getState().user, userUpdate as unknown as User, id);
							setIsUserUpdating(false);
						}}
					>
						<ScrollView style={{ width: "80%" }}>
							<UpdateIdentificationForm />
							<UpdateDetailsForm />
							<UpdateEmbodimentForm />
							<View style={{ marginTop: 50 }}>
								<FormSubmitButton disabled={isUserUpdating} />
							</View>
						</ScrollView>
					</Formik>
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	);
};

export default connector(Settings);
