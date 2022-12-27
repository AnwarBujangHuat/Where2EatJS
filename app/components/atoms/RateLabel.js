import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import startIcon from '../../assets/images/star.png';
import startIcon2 from '../../assets/images/star2.png';
import { colors } from '../../configs/Const';

export const RateLabel = ({ rating, goToRating }) => {
  const restaurantRate = rating?.toFixed(1);
  return (
    <TouchableOpacity onPress={goToRating}>
      <View style={styles.container}>
        <Text style={styles.textRate}>{restaurantRate}</Text>
        <Image
          source={rating > 4.2 ? startIcon2 : startIcon}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  icon: {
    width: 15,
    height: 15,
  },
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    margin: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: colors.bg,
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginStart: 10,
    marginTop: 5,
  },
  textRate: {
    padding: 2,
    color: colors.white,
    fontWeight: 'bold',
  },
});
