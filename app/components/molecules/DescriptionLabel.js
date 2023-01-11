import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { GStyles } from 'configs/styles';
import {
  colors,
  icons,
} from 'configs/Const';
import { ConstString } from 'configs/Strings';

export const DescriptionLabel = ({ name, location, icon, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.title}>{name}</Text>
        <TouchableOpacity onPress={onPress}>
          <Image style={styles.icon} source={icon} />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Image style={styles.locationIcon} source={icons[ConstString.LOCATION]} />
        <Text style={styles.desc}>{location}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...GStyles.shadowContainer,
    paddingTop: 40,
    paddingBottom: 20,
    paddingStart: 15,
    marginBottom: 15,
    zIndex: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    width: '88%',
    color: colors.darkPurple,
  },
  desc: {
    color: colors.white,
    paddingTop: 5,
    maxWidth: '90%',
    fontSize: 14,
  },
  icon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  locationIcon: {
    width: 14,
    height: 14,
    marginEnd: 5,
    marginTop: 5,
  },
});
