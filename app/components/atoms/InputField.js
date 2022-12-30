import React from 'react';

import {
  StyleSheet,
  TextInput,
} from 'react-native';
import { colors } from 'configs/Const';

export const InputField = ({ placeholder, multiline, onChange, value }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      multiline={multiline}
      onChangeText={text => onChange(text)}
      overflow="hidden"
      color={colors.white}
      placeholderTextColor={colors.white}
      keyboardAppearance="dark"
      autoCorrect={false}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    fontWeight: 'normal',
    borderWidth: 1,
    paddingHorizontal: 5,
    borderBottomColor: colors.primary,
    borderColor: colors.secondBg,
    textAlignVertical: 'center',
    backgroundColor: colors.secondBg,
    borderRadius: 5,
    paddingVertical: 15,
  },
});
