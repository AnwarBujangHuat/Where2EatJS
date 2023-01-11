import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  colors,
  icons,
} from 'configs/Const';
import { GStyles } from 'configs/styles';
import { ConstString } from 'configs/Strings';

const { width } = Dimensions.get('window');

export const SearchButton = ({ onPress, onChangeText, onSearch }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.icons} source={icons[ConstString.SEARCH]} />
      {onSearch && (
        <TextInput
          style={styles.input}
          placeholder={'Search....'}
          onChangeText={text => onChangeText(text)}
          color={colors.white}
          placeholderTextColor={colors.white}
          keyboardAppearance="dark"
          autoCorrect={false}
        />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 10,
    marginStart: 10,
    ...GStyles.shadowContainer,
  },
  icons: {
    height: 20,
    width: 20,
    tintColor: colors.primary,
  },
  input: {
    fontSize: 14,
    minWidth: width * 0.55,
    paddingHorizontal: 10,
  },
});
