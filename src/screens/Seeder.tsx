import React from "react";
import { Text, Button, SafeAreaView } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ScreenProps, ScreenNames } from "types/index";
import connector from "../redux/connector";
import { auth, Fake_Data } from "Firebase/index";

const Seeder = (props: ScreenProps<ScreenNames.Seeder>) => {
	const { title } = props.route.params;
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Text>{title}</Text>
			{/* <Button
        title={title}
        onPress={async () => {
          await createUserWithEmailAndPassword(
            auth,
            Fake_Data.get_email(),
            Fake_Data.get_password(),
          );
        }}
      /> */}
		</SafeAreaView>
	);
};

export default connector(Seeder);
