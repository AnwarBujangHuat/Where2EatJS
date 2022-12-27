import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import editIcon from '../../assets/images/editing.png';
import { colors } from '../../configs/Const';

export const EditableLabel = ({ onPress, title, information, icon }) => {
  return (
    <View>
      <View style={styles.label}>
        <Image style={styles.icon} source={icon} />
        <View style={styles.textContainer}>
          <Text style={styles.header}>{title}</Text>
          <Text style={styles.information}>{information}</Text>
        </View>
        <TouchableOpacity onPress={onPress}>
          <Image style={styles.icon} source={editIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginVertical: 10,
    marginHorizontal: 5,
    tintColor: colors.primary,
  },
  header: {
    color: colors.white,
    fontSize: 12,
    marginBottom: 5,
  },
  information: {
    color: colors.white,
    fontSize: 16,
  },
  textContainer: {
    paddingStart: 10,
    width: '80%',
    alignContent: 'center',
  },
  label: {
    flexDirection: 'row',
    minHeight: 80,
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    backgroundColor: colors.bg,
  },
});
