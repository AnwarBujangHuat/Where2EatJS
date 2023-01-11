import React from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { colors } from 'configs/Const';

const { width } = Dimensions.get('window');

export const ModalMenuButton = ({ isModalVisible, onPress, closeModal, menuOptions }) => {
  return (
    <>
      {{ isModalVisible } && (
        <SafeAreaView>
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={closeModal}>
            <View style={styles.modalView}>
              <FlatList
                data={menuOptions}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity onPress={() => onPress(item.id)}>
                      <Text style={styles.buttonText}>{item.title}</Text>
                    </TouchableOpacity>
                  );
                }}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </Modal>
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.lightPurple,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    textTransform: 'uppercase',
    marginTop: 15,
  },
  buttonText: {
    fontSize: 16,
    padding: 10,
    color: colors.white,
    fontWeight: 'normal',
  },
  image: {
    width: width * 0.7,
    height: 150,
    borderRadius: 10,
  },

  icons: {
    height: 20,
    width: 20,
    margin: 10,
  },
  modalView: {
    paddingVertical: 20,
    justifyContent: 'center',
    radius: 20,
    elevation: 5,
    backgroundColor: colors.secondBg,
    borderRadius: 7,
  },
});
