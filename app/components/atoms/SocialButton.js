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
import { GStyles } from 'configs/Styles';

export const SocialButton = ({ tesId, onPress, icon }) => {
  return (
    <View>
      <TouchableOpacity
        testID={tesId}
        style={styles.buttonContainer}
        onPress={onPress}>
        <Image source={icons[icon]} style={styles.icon} />
        <Text style={styles.buttonText}>{'Sign in With Google'}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  buttonText: {
    marginStart: 10,
    alignSelf: 'center',
    color: colors.white,
    fontWeight: 'bold',
  },
  buttonContainer: {
    ...GStyles.shadowContainer,
    flexDirection: 'row',
    borderRadius: 20,
    marginTop: 15,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 15,
  },
  icon: {
    width: 30,
    height: 30,
  },
});
