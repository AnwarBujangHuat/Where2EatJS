import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import Cat from '../../assets/lottie/purplecat.json';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import { colors } from '../../configs/Const';
import { GStyles } from '../../Styles';

const { width } = Dimensions.get('window');

export const ModalGiveRating = ({
  closeModal,
  isModalVisible,
  submit,
  userReview,
}) => {
  const { review, rating, updatedAt, createdAt } = userReview || {};
  const [textReview, setReview] = useState(review);
  const [newRate, setRate] = useState(rating);
  const [isUploading, setIsUploading] = useState(false);
  let status;
  const sendSubmission = () => {
    setIsUploading(true);
    submit(textReview, newRate);
  };
  if (updatedAt === undefined && createdAt === undefined) {
    status = 'First Time';
  } else if (updatedAt !== '') {
    status = 'Updated At: ' + updatedAt;
  } else {
    status = 'Created At: ' + createdAt;
  }
  return (
    <>
      {isModalVisible && (
        <SafeAreaView style={styles.screen}>
          <Modal
            animationType="none"
            transparent
            visible={isModalVisible}
            presentationStyle="overFullScreen"
            style={styles.viewWrapper}>
            {isUploading ? (
              <View style={styles.modalView}>
                <LottieView
                  style={styles.lottieButton}
                  source={Cat}
                  autoPlay={true}
                />
                <Text style={styles.header}>
                  {'Wait while we write your Review'}
                </Text>
              </View>
            ) : (
              <View style={styles.modalView}>
                <Text style={styles.header}>{'What\'s Your Review?'}</Text>
                <AirbnbRating
                  count={5}
                  isDisabled={false}
                  showRating={true}
                  onFinishRating={rate => setRate(rate)}
                  reviews={[
                    'Terrible',
                    'Hmm...',
                    'OK',
                    'Quite Good',
                    'Excellent',
                  ]}
                  defaultRating={rating !== undefined ? rating : 1}
                  ratingContainerStyle={{ marginVertical: 20 }}
                  size={30}
                />
                <TextInput
                  style={styles.descriptionInput}
                  placeholder={'Enter Review'}
                  value={textReview}
                  multiline={true}
                  onChangeText={setReview}
                  placeholderTextColor={colors.white}
                  overflow="hidden"
                  keyboardAppearance="dark"
                  autoCorrect={false}
                />
                <Text style={styles.desc}>{status}</Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={closeModal}>
                    <Text style={styles.buttonTextSpin}>Go Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonVisit}
                    onPress={sendSubmission}>
                    <Text style={styles.buttonTextMenu}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Modal>
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 5,
  },
  buttonVisit: {
    backgroundColor: colors.secondBg,
    alignItems: 'center',
    padding: 5,
    width: '50%',
    borderLeftColor: colors.primary,
    borderColor: colors.secondBg,
    borderWidth: 0.5,
    textTransform: 'uppercase',
    marginTop: 15,
  },
  button: {
    backgroundColor: colors.secondBg,
    alignItems: 'center',
    padding: 5,
    width: '50%',
    borderColor: colors.secondBg,
    borderWidth: 0.5,
    textTransform: 'uppercase',
    marginTop: 15,
  },
  buttonTextSpin: {
    fontSize: 16,
    color: colors.lightPurple,
    fontWeight: 'normal',
  },
  buttonTextMenu: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'normal',
  },

  changeButton: {
    position: 'absolute',
    left: 0,
    fontWeight: 'bold',
    fontSize: 12,
    color: 'white',
    backgroundColor: colors.primary,
    padding: 5,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'normal',
  },
  container: {
    alignSelf: 'flex-start',
    margin: 10,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  modalView: {
    paddingHorizontal: 10,
    position: 'absolute',
    alignSelf: 'center',
    width: width * 0.9,
    backgroundColor: colors.secondBg,
    borderRadius: 7,
  },
  header: {
    ...GStyles.shadowContainer,
    fontSize: 18,
    paddingVertical: 20,
    fontWeight: 'bold',
    color: colors.primary,
    alignSelf: 'center',
  },
  desc: {
    color: colors.lightPurple,
    paddingEnd: 5,
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'justify',
  },

  descriptionInput: {
    fontSize: 14,
    fontWeight: 'normal',
    borderWidth: 1,
    borderBottomColor: colors.primary,
    color: colors.white,
    borderColor: 'transparent',
    textAlignVertical: 'center',
    backgroundColor: colors.secondBg,
    paddingTop: 20,
    paddingBottom: 10,
  },
  lottieButton: {
    width: width * 0.6,
    height: width * 0.6,
    alignSelf: 'center',
  },
});
