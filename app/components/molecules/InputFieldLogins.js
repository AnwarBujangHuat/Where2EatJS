import {
  Image,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import { colors } from 'configs/Const';
import { GStyles } from 'configs/styles';

export const InputFieldLogins = ({
  testID,
  onChangeText1,
  defvalue,
  source,
  secret,
  hint,
}) => {
  return (
    <View style={styles.section}>
      <Image style={styles.icons} source={source} />
      <TextInput
        testID={testID}
        style={styles.input}
        placeholder={hint}
        value={defvalue}
        clearButtonMode={'while-editing'}
        onChangeText={text => onChangeText1(text)}
        overflow="hidden"
        placeholderTextColor={colors.white}
        keyboardAppearance="dark"
        secureTextEntry={secret}
        color={colors.white}
        autoCorrect={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  section: {
    backgroundColor: colors.bg,
    ...GStyles.shadowContainer,
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 10,
  },
  input: {
    fontSize: 14,
    fontWeight: 'normal',
    marginHorizontal: 10,
    textAlignVertical: 'center',
    backgroundColor: colors.secondBg,
    marginVertical: 2,
    paddingTop: 15,
    paddingRight: 15,
    paddingBottom: 15,
    paddingLeft: 0,
    width: '80%',
  },
  icons: {
    flexDirection: 'row',
    alignSelf: 'center',
    tintColor: colors.primary,
    height: 25,
    width: 25,
    margin: 10,
  },
});
