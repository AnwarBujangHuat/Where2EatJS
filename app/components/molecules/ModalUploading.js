import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';

import Uploading from '../../assets/lottie/uploading.json';
import Sleepy from '../../assets/lottie/sleepycat.json';
import { ConstString } from '../../configs/Strings';
import { colors } from '../../configs/Const';
import { GStyles } from '../../Styles';

const { width } = Dimensions.get('window');
let icon;
let text;
let showButton = false;
export const ModalUploading = ({
  isModalVisible,
  closeModal,
  goBack,
  action,
}) => {
  if (action === ConstString.GO_BACK) {
    icon = Sleepy;
    text = 'All Your Progress in This Page Will Be Lost';
    showButton = true;
  } else {
    icon = Uploading;
    text = 'Please Wait While We Upload your Photos';
    showButton = false;
  }
  return (
    <>
      {isModalVisible && (
        <SafeAreaView style={styles.screen}>
          <Modal
            animationType="none"
            transparent
            visible={isModalVisible}
            onDismiss={closeModal}
            style={styles.viewWrapper}>
            <View style={styles.modalView}>
              <LottieView
                style={styles.lottieButton}
                source={icon}
                autoPlay={true}
              />
              <Text style={styles.header}>{text}</Text>
              {showButton && (
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity style={styles.button} onPress={goBack}>
                    <Text style={styles.buttonTextGoBack}>Go Back</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonVisit}
                    onPress={closeModal}>
                    <Text style={styles.buttonTextStay}>Stay</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </Modal>
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  buttonTextGoBack: {
    fontSize: 16,
    color: colors.lightPurple,
    fontWeight: 'normal',
  },
  buttonTextStay: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'normal',
  },
  container: {
    alignSelf: 'flex-start',
    margin: 10,
  },
  icon: {
    alignSelf: 'center',
    marginTop: 5,
    marginEnd: 5,
  },
  lottieButton: {
    width: width * 0.6,
    height: width * 0.6,
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
    alignSelf: 'center',
    ...GStyles.shadowContainer,
  },
  modalView: {
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'center',
    width: width * 0.8,
    backgroundColor: colors.secondBg,
    borderRadius: 10,
  },
  button: {
    backgroundColor: colors.secondBg,
    alignItems: 'center',
    padding: 5,
    width: '50%',
    borderColor: colors.secondBg,
    borderRightColor: colors.primary,
    borderWidth: 0.5,
    textTransform: 'uppercase',
    marginTop: 15,
  },
  buttonVisit: {
    backgroundColor: colors.secondBg,
    alignItems: 'center',
    padding: 5,
    width: '50%',
    borderColor: colors.secondBg,
    borderWidth: 0.5,
    textTransform: 'uppercase',
    marginTop: 15,
  },
  header: {
    fontSize: 17,
    paddingBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
    width: width * 0.7,
  },
  desc: {
    color: colors.lightPurple,
    paddingEnd: 5,
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'justify',
  },
  descContainer: { paddingHorizontal: 10 },
  logoIcon: {
    height: 60,
    width: 60,
  },
  iconCategory: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  containerIcon: {
    flexDirection: 'row',
    marginTop: 5,
  },
});
