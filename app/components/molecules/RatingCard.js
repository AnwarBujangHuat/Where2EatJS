import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import defaultAvatar from '../../assets/images/programmer.png';
import { RateLabel } from 'components/atoms/RateLabel';
import { GStyles } from 'configs/Styles';
import { colors } from 'configs/Const';

export const RatingCard = ({ userReview }) => {
  const image = undefined;
  const { userName, review, rating, createdAt, updatedAt } = userReview || {};
  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginStart: 5 }}>
        <FastImage
          source={
            image
              ? {
                uri: image,
                priority: FastImage.priority.high,
              }
              : defaultAvatar
          }
          style={styles.userImage}
        />
        <View style={{ flexDirection: 'column', width: '65%' }}>
          <Text style={styles.title}>{userName}</Text>
          <Text style={styles.timestampText}>
            {updatedAt !== ''
              ? 'Updated At: ' + updatedAt
              : 'Created At: ' + createdAt}
          </Text>
        </View>
        <RateLabel rating={rating} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.desc}>{review}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    ...GStyles.shadowContainer,
    marginVertical: 10,
    width: Dimensions.get('screen').width - 35,
    maxHeight: 170,
  },
  descriptionContainer: {
    padding: 10,
    marginBottom: 10,
  },
  timestampText: {
    fontSize: 11,
    color: colors.white,
  },
  desc: {
    color: colors.white,
    paddingTop: 5,
    textAlign: 'justify',
    fontSize: 14,
  },
  title: {
    fontSize: 16,
    color: colors.white,
  },
  userImage: {
    height: 35,
    width: 35,
    marginBottom: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    resizeMode: 'contain',
  },
});
