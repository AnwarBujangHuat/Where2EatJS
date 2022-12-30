import * as React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  colors,
  icons,
} from 'configs/Const';
import { GStyles } from 'configs/Styles';

export const ItemListRestaurant = ({ onPress, name, category, index }) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.card}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{index + 1 + '. ' + name}</Text>
            </View>
            <Image
              source={category ? icons[category] : icons.def}
              style={styles.iconCategory}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  iconCategory: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  container: {
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 5,
    alignSelf: 'center',
    ...GStyles.shadowContainer,
  },
  card: {
    backgroundColor: colors.secondBg,
    borderRadius: 10,
    width: Dimensions.get('screen').width - 50,
    overflow: 'hidden',
    padding: 5,
    ...GStyles.shadowContainer,
  },
  titleContainer: {
    padding: 10,
    width: '90%',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
  },
  containerIcon: {
    flexDirection: 'row',
    marginTop: 5,
  },
});
