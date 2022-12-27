import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import { colors } from '../../configs/Const';
import { GStyles } from '../../configs/Styles';
import TestIDs from '../../../e2e/TestIDs';

const { width } = Dimensions.get('window');

export const SearchBar = ({ onChangeText, placeholder, source }) => {
  return (
    <SafeAreaView style={styles.section}>
      <View style={styles.searchbar}>
        <Image style={styles.icons} source={source} />
        <TextInput
          testID={TestIDs.SearchBar}
          style={styles.input}
          placeholder={placeholder}
          clearButtonMode={'while-editing'}
          placeholderTextColor={colors.white}
          onChangeText={onChangeText}
          autoCorrect={false}
          color={colors.white}
          overflow="hidden"
          keyboardAppearance="dark"
        />
      </View>
      <View>
        {/*<TouchableOpacity style={styles.sortButton}*/}
        {/*>*/}
        {/*  <Text style={styles.text}>{'Sort By'}</Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  searchbar: {
    ...GStyles.shadowContainer,
    flexDirection: 'row',
    borderRadius: 10,
    marginVertical: 10,
    width: width - 30,
    padding: 5,
  },
  text: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  input: {
    fontSize: 14,
    padding: 10,
    width: '90%',
  },
  icons: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: 20,
    width: 20,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    tintColor: colors.primary,
  },
});
