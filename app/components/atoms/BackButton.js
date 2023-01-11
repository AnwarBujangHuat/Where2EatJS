import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { GStyles } from 'configs/styles';
import { icons } from 'configs/Const';
import { ConstString } from 'configs/Strings';

export const BackButton = ({ onPress }) => {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Image style={styles.icons} source={icons[ConstString.BACK]} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...GStyles.shadowContainer,
    alignSelf: 'flex-start',
    borderRadius: 40,
    padding: 11,
    marginStart: 10,
  },
  icons: {
    height: 20,
    width: 20,
  },
});
