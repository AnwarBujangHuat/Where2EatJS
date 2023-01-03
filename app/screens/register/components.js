import React from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { DetailsHeader } from 'molecules/DetailsHeader';
import {
  colors,
  Const,
} from 'configs/Const';
import { ImageButton } from 'atoms/ImageButton';
import { InputField } from 'atoms/InputField';
import { ModalLocation } from 'molecules/ModalLocation';
import { GStyles } from 'configs/styles';

export const RegisterComponents = props => {
  const {
    selectedTypes,
    restaurantName,
    restaurantDesc,
    restaurantLocation,
    initialIndex,
    goToMenu,
    goBack,
    setName,
    setDescription,
    categorySelected,
    launchImageLibrary,
    imageUri,
    updateRestaurantInfo,
    editorMode,
    addLocation,
    openLocationModal,
    closeLocationModal,
    isModalOpen,
  } = props;
  return (
    <SafeAreaView style={GStyles.screens}>
      <DetailsHeader
        back={goBack}
        disabled={false}
        onPress={launchImageLibrary}
        image={imageUri}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.header}>{'Restaurant Name'}</Text>
        <InputField
          placeholder={'Please Input Name'}
          multiline={false}
          onChange={text => setName(text)}
          value={restaurantName}
        />
        <Text style={styles.header}>{'Description'}</Text>
        <InputField
          placeholder={'Please Input Description'}
          multiline={true}
          onChange={text => setDescription(text)}
          value={restaurantDesc}
        />
        <Text style={styles.header}>{'Category'}</Text>
        <FlatList
          style={{ maxHeight: 60 }}
          data={Const}
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 500));
            wait.then(() => {
              Const.current?.scrollToIndex({
                index: info.index,
                animated: true,
              });
            });
          }}
          initialScrollIndex={initialIndex ?? 0}
          renderItem={({ item }) => {
            return (
              <ImageButton
                item={item}
                onPress={() => categorySelected({ item })}
                selected={selectedTypes}
              />
            );
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.header}>{'Location'}</Text>
        <TouchableOpacity
          style={styles.buttonLocation}
          onPress={openLocationModal}>
          <Text
            style={{
              color: colors.primary,
              fontWeight: 'bold',
            }}>
            Location
          </Text>
        </TouchableOpacity>
        <Text style={styles.desc}>{restaurantLocation}</Text>
        <ModalLocation
          isModalVisible={isModalOpen}
          submitLocation={addLocation}
          closeModal={closeLocationModal}
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableOpacity
          style={styles.button}
          onPress={editorMode ? updateRestaurantInfo : goToMenu}>
          <Text style={styles.buttonText}>
            {editorMode ? 'Update Restaurant Info' : 'Go To Menu'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  descriptionInput: {
    fontSize: 14,
    fontWeight: 'normal',
    borderWidth: 1,
    paddingHorizontal: 5,
    borderBottomColor: colors.primary,
    borderColor: colors.white,
    textAlignVertical: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    marginVertical: 10,
    paddingVertical: 15,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
    color: colors.darkPurple,
    shadowOffset: { width: -2, height: 2 },
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  button: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    width: Dimensions.get('screen').width - 30,
    textTransform: 'uppercase',
    bottom: 10,
    // position: 'absolute',
    marginHorizontal: 15,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  buttonLocation: {
    borderColor: colors.lightPurple,
    borderWidth: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    textTransform: 'uppercase',
  },
  inputContainer: {
    marginTop: 30,
    height: '60%',
    marginHorizontal: 15,
  },
  desc: {
    color: colors.white,
    paddingTop: 5,
    fontSize: 12,
    marginVertical: 5,
  },
});
