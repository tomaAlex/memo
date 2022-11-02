import React from 'react';
import {
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  Text,
  View,
  TextInput,
} from 'react-native';
import connector from '../../redux/connector';
import {useTranslation} from 'react-i18next';
import '../../translations/i18.config';
import {ScreenNames, ScreenProps} from 'types/index';
import {useFormik} from 'formik';

const Signup = ({}: ScreenProps<ScreenNames.Signup>) => {
  const [t] = useTranslation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* <SafeAreaView>
        <Text>{t('Signup.title')}</Text>
      </SafeAreaView> */}
      {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TextInput placeholder="Email" /> */}
      <View />
    </TouchableWithoutFeedback>
  );
};

export default connector(Signup);
