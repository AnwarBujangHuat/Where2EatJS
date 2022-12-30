import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { ConstString } from 'configs/Strings';
import { colors } from 'configs/Const';
import TestIDs from '../../../e2e/TestIDs';

const { width } = Dimensions.get('window');

export const Header = ({ source, onPress, title }) => {
  return (
    <View style={styles.section}>
      <TouchableOpacity testID={TestIDs.BtnMenu} onPress={onPress}>
        <Image style={styles.icons} source={source} />
      </TouchableOpacity>
      <Text style={styles.title}>{ConstString.QUOTES}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  section: {
    flexDirection: 'row',
    maxHeight: width * 0.15,
    alignItems: 'center',
  },
  icons: {
    height: 35,
    width: 35,
    marginHorizontal: 20,
    borderRadius: 40,
  },
  title: {
    fontSize: 15,
    color: colors.white,
    fontWeight: 'bold',
  },
});
