import {
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import searchIcon from '../../assets/search.png';
import {colors} from '../../configs/Const';
import {GStyles} from '../../Styles';

const {width} = Dimensions.get('window');

export const SearchButton = ({onPress, onChangeText, onSearch}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={styles.icons} source={searchIcon} />
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
    backgroundColor: colors.secondBg,
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
    width: width * 0.5,
    paddingHorizontal: 10,
  },
});
