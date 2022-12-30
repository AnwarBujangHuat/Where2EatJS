import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { colors } from 'configs/Const';
import { GStyles } from 'configs/Styles';
import TestIDs from '../../../e2e/TestIDs';

export const ImageButton = ({ onPress, item, selected }) => {
  let backGroundColor = selected.includes(item.title)
    ? colors.primary
    : colors.secondBg;
  let color = selected.includes(item.title) ? 'white' : colors.primary;
  return (
    <View>
      <TouchableOpacity
        testID={TestIDs.BtnChip}
        style={{ ...styles.buttonContainer, backgroundColor: backGroundColor }}
        onPress={onPress}>
        <Image source={item.icon} style={styles.icon} />
        <Text style={{ ...styles.text, color: color }}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    padding: 5,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  buttonContainer: {
    ...GStyles.shadowContainer,
    flexDirection: 'row',
    borderRadius: 20,
    margin: 5,
    padding: 10,
    alignItems: 'center',
  },
  icon: {
    width: 25,
    height: 25,
  },
});
