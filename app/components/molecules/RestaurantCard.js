import * as React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { RateLabel } from 'atoms/RateLabel';
import locationIcon from 'images/location.png';
import {
  colors,
  icons,
} from 'configs/Const';
import addImage from 'images/addImage.png';
import FastImage from 'react-native-fast-image';
import { GStyles } from 'configs/Styles';

export const RestaurantCard = ({
  onPress,
  name,
  category,
  address,
  description,
  rate,
  image,
}) => {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.card}>
          <View>
            <FastImage
              source={
                image
                  ? {
                    uri: image,
                    priority: FastImage.priority.normal,
                  }
                  : addImage
              }
              style={{ height: 140, marginBottom: 5, resizeMode: 'contain' }}>
              <RateLabel rating={rate} />
            </FastImage>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{name}</Text>
              <Text numberOfLines={2} style={styles.desc}>
                {category + ' - ' + description}
              </Text>
              <View style={styles.containerIcon}>
                <Image style={styles.icon} source={locationIcon} />
                <Text style={styles.desc}>{address}</Text>
              </View>
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
  icon: {
    width: 11,
    height: 11,
    alignSelf: 'center',
    marginTop: 5,
    marginEnd: 5,
  },
  iconCategory: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  container: {
    justifyContent: 'center',
    margin: 15,
    borderRadius: 10,
    ...GStyles.shadowContainer,
  },
  card: {
    backgroundColor: colors.secondBg,
    borderRadius: 10,
    width: Dimensions.get('screen').width - 30,
    height: 250,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  titleContainer: {
    padding: 10,
    width: '90%',
  },
  desc: {
    color: colors.white,
    paddingTop: 5,
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkPurple,
  },
  containerIcon: {
    flexDirection: 'row',
    marginTop: 5,
  },
});
