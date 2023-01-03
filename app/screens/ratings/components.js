import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Rating } from 'react-native-ratings';
import React from 'react';
import { BackButton } from 'atoms/BackButton';
import { RatingCard } from 'molecules/RatingCard';
import addIcon from 'images/plus.png';
import { ModalGiveRating } from 'molecules/ModalGiveRating';
import { BarChart } from 'react-native-chart-kit';
import { RatingButton } from 'atoms/RatingButton';
import { colors } from 'configs/Const';
import { GStyles } from 'configs/styles';

export const RatingComponents = props => {
  const {
    onBackButton,
    restaurantInfo,
    isModalRateOpen,
    closeModal,
    submit,
    userReview,
    isCurrentRating,
    ratingCount,
    openModal,
    isFirstTimeRate,
    restaurantList,
    ratingChipButton,
    onSelectedRating,
    isSelectedRating,
  } = props;
  const { rating } = restaurantInfo;
  const RenderItem = ({ item }) => {
    return (
      <RatingButton
        rating={item}
        onPress={onSelectedRating}
        selected={isSelectedRating}
      />
    );
  };
  const renderRateCard = ({ item }) => {
    return <RatingCard userReview={item} />;
  };
  const SelfReview = () => {
    return !isFirstTimeRate ? (
      <RatingCard userReview={userReview} />
    ) : (
      <Text style={styles.reviewText}>No Review</Text>
    );
  };
  return (
    <SafeAreaView style={GStyles.screens}>
      <View style={styles.rowContainer}>
        <BackButton onPress={onBackButton} />
        <Text style={styles.header}>
          {restaurantInfo.restaurant + ' Customer Review'}
        </Text>
      </View>
      <View style={{ marginHorizontal: 15 }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              alignSelf: 'center',
              alignContent: 'center',
              paddingRight: 30,
            }}>
            <Text style={styles.rating}> {isCurrentRating.toFixed(1)}</Text>
            <Rating
              type="star"
              fractions={1}
              startingValue={isCurrentRating}
              readonly={true}
              showReadOnlyText={false}
              tintColor={colors.bg}
              style={{ paddingStart: 10 }}
              imageSize={18}
              ratingTextColor={colors.white}
            />
            <View style={{ paddingStart: 10 }}>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.white,
                  paddingVertical: 5,
                  alignSelf: 'flex-start',
                }}>
                {rating?.length + ' Reviews'}
              </Text>
            </View>
          </View>
          <BarChart
            style={{
              transform: [{ rotate: '90deg' }],
              marginStart: 30,
              paddingRight: 0,
            }}
            data={{
              labels: [5, 4, 3, 2, 1],
              datasets: [
                {
                  data: ratingCount ?? [],
                },
              ],
            }}
            chartConfig={{
              backgroundGradientFrom: 'transparent',
              backgroundGradientFromOpacity: 0,
              backgroundGradientTo: 'transparent',
              fillShadowGradient: colors.white,
              fillShadowGradientFrom: colors.white,
              fillShadowGradientFromOpacity: 1,
              fillShadowGradientOpacity: 1,
              fillShadowGradientTo: colors.white,
              fillShadowGradientToOffset: 1,
              fillShadowGradientFromOffset: 1,
              backgroundGradientToOpacity: 0,
              color: (opacity = 1) => colors.white,
              labelColor: (opacity = 1) => colors.white,
              strokeWidth: 1,
              barPercentage: 0.4,
            }}
            withHorizontalLabels={false}
            width={120}
            height={180}
            verticalLabelRotation={270}
            withInnerLines={false}
            hideLegend
          />
        </View>

        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
          <Text style={styles.header}>Your Review</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={openModal}>
            <Image style={styles.addIcon} source={addIcon} />
            <Text
              style={{
                padding: 5,
                color: 'white',
                fontWeight: 'bold',
                alignSelf: 'center',
                fontSize: 12,
              }}>
              {!isFirstTimeRate ? 'Update Review' : 'Add Review'}
            </Text>
          </TouchableOpacity>
        </View>
        <SelfReview />
        <FlatList
          data={ratingChipButton}
          renderItem={RenderItem}
          horizontal={true}
          style={{ marginVertical: 5 }}
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          data={restaurantList}
          renderItem={renderRateCard}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {isModalRateOpen && (
        <ModalGiveRating
          closeModal={closeModal}
          isModalVisible={isModalRateOpen}
          submit={(text, newRate) => submit(text, newRate)}
          userReview={userReview}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  label: {
    color: colors.white,
    fontSize: 13,
  },
  icon: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  addIcon: {
    width: 10,
    height: 10,
    marginStart: 5,
    alignSelf: 'center',
  },
  header: {
    fontSize: 17,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: colors.primary,
  },
  rating: {
    fontSize: 60,
    color: colors.white,
  },
  reviewHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  button: {
    backgroundColor: colors.lightPurple,
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    width: Dimensions.get('screen').width - 30,
    textTransform: 'uppercase',
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
    alignSelf: 'center',
    marginStart: 10,
  },
  rowContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignContent: 'center',
  },
  ratingContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    alignContent: 'center',
  },
  reviewText: {
    fontSize: 14,
    color: colors.white,
    fontWeight: 'bold',
  },
  buttonContainer: {
    ...GStyles.shadowContainer,
    padding: 5,
    flexDirection: 'row',
    borderRadius: 20,
    right: 0,
    position: 'absolute',
  },
});
