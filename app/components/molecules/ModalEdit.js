import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from 'configs/Const';
import { GStyles } from 'configs/Styles';
import Modal from 'react-native-modal';

const { width } = Dimensions.get('window');

export const ModalEdit = ({
  isModalVisible,
  closeModal,
  onDone,
  Title,
  setUpdatedInfo,
}) => {
  return (
    <>
      {isModalVisible && (
        <SafeAreaView style={styles.screen}>
          <Modal
            isVisible={isModalVisible}
            presentationStyle="overFullScreen">
            <View style={styles.viewWrapper}>
              <View style={styles.modalView}>
                <Text style={styles.header}>{'Change ' + Title}</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder={'Enter ' + Title}
                  clearButtonMode={'always'}
                  placeholderTextColor={colors.white}
                  onChangeText={text => setUpdatedInfo(text)}
                  overflow="hidden"
                  keyboardAppearance="dark"
                  autoCorrect={false}
                />
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity style={styles.button} onPress={closeModal}>
                    <Text style={styles.buttonTextSpin}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonVisit} onPress={onDone}>
                    <Text style={styles.buttonTextMenu}>Done</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
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
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  viewWrapper: {
    flex: 1,
    ...GStyles.shadowContainer,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    padding: 20,
    justifyContent: 'center',
    position: 'absolute',
    alignSelf: 'center',
    width: width * 0.8,
    backgroundColor: colors.secondBg,
    borderRadius: 7,
  },
  textInput: {
    fontSize: 14,
    fontWeight: 'normal',
    borderWidth: 1,
    color: colors.white,
    borderBottomColor: colors.primary,
    borderColor: colors.secondBg,
    textAlignVertical: 'center',
    backgroundColor: colors.secondBg,
    borderRadius: 5,
    marginBottom: 10,
    paddingVertical: 15,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    ...GStyles.shadowContainer,
    color: colors.lightPurple,
  },
  descriptionInput: {
    fontSize: 14,
    fontWeight: 'normal',
    borderWidth: 1,
    borderBottomColor: colors.primary,
    color: colors.white,
    borderColor: colors.bg,
    textAlignVertical: 'center',
    backgroundColor: colors.secondBg,
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 15,
  },
});
