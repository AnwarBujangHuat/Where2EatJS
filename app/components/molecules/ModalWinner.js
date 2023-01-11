import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FastImage from 'react-native-fast-image';
import {
  colors,
  icons,
} from 'configs/Const';
import Modal from 'react-native-modal';
import { GStyles } from 'configs/styles';
import { ConstString } from 'configs/Strings';

const { width } = Dimensions.get('window');
export const ModalWinner = ({
  isModalVisible,
  closeModal,
  selectedRestaurant,
  goToMenu,
  isFinished,
  isPreview,
}) => {
  const { restaurant, description, address, category, image } =
    selectedRestaurant;
  const spinAgain = () => {
    closeModal();
  };
  return (
    <>
      {isModalVisible && (
        <SafeAreaView style={styles.screen}>
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={closeModal}
            presentationStyle="overFullScreen"
            style={styles.viewWrapper}>
            <View style={styles.modalView}>
              <FastImage
                source={
                  image !== undefined
                    ? {
                      uri: image,
                      priority: FastImage.priority.high,
                    }
                    : {
                      uri: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/5eeea355389655.59822ff824b72.gif',
                    }
                }
                style={{
                  height: 200,
                  resizeMode: 'contain',
                }}
              />

              <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                <Text style={styles.header}>{restaurant}</Text>
                <Image
                  source={category ? icons[category] : icons.def}
                  style={styles.iconCategory}
                />
              </View>

              <View style={styles.descContainer}>
                <Text style={styles.desc}>
                  {category + ' - ' + description}
                </Text>
                <View style={styles.containerIcon}>
                  <Image style={styles.icon} source={icons[ConstString.LOCATION]} />
                  <Text style={styles.address}>{address}</Text>
                </View>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignSelf: 'center',
                }}>
                <TouchableOpacity style={styles.button} onPress={spinAgain}>
                  <Text style={styles.buttonTextSpin}>
                    {isFinished ? 'Spin Again' : 'Go Back'}
                  </Text>
                </TouchableOpacity>
                {!isPreview && (
                  <TouchableOpacity
                    style={styles.buttonVisit}
                    onPress={goToMenu}>
                    <Text style={styles.buttonTextMenu}>Visit Restaurant</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <TouchableOpacity style={styles.logoContainer}>
              <Image style={styles.logoIcon} source={icons[ConstString.LOGO]} />
            </TouchableOpacity>
          </Modal>
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
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
  container: {
    alignSelf: 'flex-start',
    margin: 10,
  },
  icon: {
    width: 11,
    height: 11,
    alignSelf: 'center',
    marginTop: 5,
    marginEnd: 5,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  modalView: {
    paddingBottom: 5,
    justifyContent: 'center',
    position: 'absolute',
    elevation: 5,
    alignSelf: 'center',
    width: width * 0.8,
    ...GStyles.shadowContainer,
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    paddingStart: 10,
    width: '90%',
  },
  price: {
    color: colors.lightPurple,
    marginVertical: 5,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  desc: {
    color: colors.lightPurple,
    paddingEnd: 5,
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'justify',
  },
  descContainer: { paddingHorizontal: 15 },
  address: {
    color: colors.lightPurple,
    paddingEnd: 5,
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'normal',
    textAlign: 'justify',
  },
  logoContainer: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderRadius: 80,
    borderColor: colors.primary,
    position: 'absolute',
    top: '22%',
  },
  logoIcon: {
    height: 90,
    width: 90,
  },
  iconCategory: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  containerIcon: {
    flexDirection: 'row',
    marginTop: 5,
    paddingBottom: 5,
  },
});
