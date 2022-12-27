import * as React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Logo from '../../assets/images/allfood.png';
import { InputFieldLogins } from '../../components/molecules/InputFieldLogins';
import email from '../../assets/images/email.png';
import password from '../../assets/images/password.png';
import { IconButton } from '../../components/molecules/IconButton';
import { SocialButton } from '../../components/atoms/SocialButton';
import { ConstString } from '../../configs/Strings';
import TestIDs from '../../../e2e/TestIDs';
import { colors } from '../../configs/Const';

export const LoginComponents = props => {
  const {
    onChangeInputEmail,
    onChangeInputPassword,
    goToSignIn,
    verifyUser,
    Email,
    Password,
    onGoogleButtonPress,
    onClickRememberMe,
    onRememberMe,
  } = props;
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Sign In</Text>
        <InputFieldLogins
          testID={TestIDs.IFEmail}
          hint={'Email'}
          defvalue={Email}
          onChangeText1={onChangeInputEmail}
          source={email}
          secret={false}
        />
        <InputFieldLogins
          testID={TestIDs.IFPassword}
          hint={'Password'}
          defvalue={Password}
          onChangeText1={onChangeInputPassword}
          source={password}
          secret={true}
        />
        <View style={styles.checkboxContainer}>
          <CheckBox
            testID={TestIDs.BtnRememberMe}
            value={onRememberMe}
            onCheckColor={colors.primary}
            tintColor={colors.primary}
            onTintColor={colors.primary}
            boxType={'square'}
            tintColors={colors.primary}
            onValueChange={onClickRememberMe}
            style={{ height: 15, width: 15 }}
          />
          <Text style={styles.text}>Remember Me</Text>
        </View>
        <TouchableOpacity
          testID={TestIDs.BtnDone}
          style={styles.buttonDone}
          onPress={verifyUser}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonForPass}>
          <Text style={{ color: colors.primary, textAlign: 'center' }}>
            Forget Password
          </Text>
        </TouchableOpacity>
        <IconButton
          title="Don't Have an Account? "
          buttontitle="Sign Up"
          onPress={goToSignIn}
        />
        <SocialButton
          tesId={TestIDs.BtnSignInGoogle}
          onPress={onGoogleButtonPress}
          icon={ConstString.GOOGLE}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  text: {
    color: colors.white,
    textAlign: 'center',
    marginStart: 10,
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    alignItems: 'center',
    margin: 30,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  title: {
    fontWeight: 'normal',
    fontSize: 20,
    color: colors.white,
    marginVertical: 10,
  },
  inputContainer: {
    flex: 1,
    marginHorizontal: 30,
  },
  buttonDone: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
  },
  buttonForPass: {
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    margin: 5,
    alignItems: 'center',
  },
  label: {
    margin: 8,
  },
});
