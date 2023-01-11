import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  colors,
  icons,
} from 'configs/Const';
import { GStyles } from 'configs/styles';
import { ConstString } from 'configs/Strings';

export const RatingButton = ({ onPress, rating, selected }) => {
  let backGroundColor = rating === selected ? colors.primary : colors.secondBg;
  let color = rating === selected ? colors.white : colors.primary;
  return (
    <View>
      <TouchableOpacity
        style={{ ...styles.inputContainer, backgroundColor: backGroundColor }}
        onPress={() => onPress(rating)}>
        <Image source={icons[ConstString.STAR2]} style={styles.icon} />
        <Text
          style={{
            padding: 5,
            color: color,
            fontWeight: 'bold',
          }}>
          {rating + ' Rating'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  inputContainer: {
    ...GStyles.shadowContainer,
    flexDirection: 'row',
    borderRadius: 20,
    margin: 5,
    padding: 10,
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
});
