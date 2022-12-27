import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text as RNText,
  TouchableOpacity,
  View,
} from 'react-native';
import { BackButton } from '../../components/atoms/BackButton';
import personIcon from '../../assets/images/programmer.png';
import { EditableLabel } from '../../components/atoms/EditableLabel';
import { ModalEdit } from '../../components/molecules/ModalEdit';
import { colors } from '../../configs/Const';

export const ProfileComponents = props => {
  const {
    goBackHome,
    InformationList,
    editInformation,
    isModalVisible,
    selectedInfo,
    closeModal,
    onDone,
    setUpdatedInfo,
  } = props;
  return (
    <SafeAreaView style={styles.backGround}>
      <View style={styles.rowContainer}>
        <BackButton onPress={goBackHome} />
        <RNText style={styles.title}>{'My Profile'}</RNText>
      </View>
      <View>
        <TouchableOpacity onPress={() => console.log('Profile')}>
          <Image style={styles.profileImage} source={personIcon} />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          style={{ marginTop: 15 }}
          data={InformationList}
          renderItem={({ item, index }) => {
            return (
              <EditableLabel
                title={item.title}
                information={item.information}
                onPress={() => editInformation(item.id)}
                icon={item.icon}
              />
            );
          }}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      {isModalVisible && (
        <ModalEdit
          isModalVisible={isModalVisible}
          closeModal={closeModal}
          Title={selectedInfo}
          setUpdatedInfo={setUpdatedInfo}
          onDone={onDone}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  backGround: {
    backgroundColor: colors.bg,
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    margin: 10,
  },
  profileImage: {
    alignSelf: 'center',
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: colors.secondBg,
  },
});
