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

export const ModalMenuButton = ({ isModalVisible, onPress, closeModal }) => {
  //TODO: Menu Map in screens
  const MENU_OPTIONS = [
    {
      id: 1,
      title: 'Register New Restaurant',
    },
    {
      id: 2,
      title: 'Profile',
    },
    {
      id: 3,
      title: 'Log Out',
    },
  ];
  return (
    <>
      {{ isModalVisible } && (
        <SafeAreaView>
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={closeModal}>
            <View style={styles.modalView}>
              <FlatList
                data={MENU_OPTIONS}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity onPress={() => item.onPress(item.id)}>
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
