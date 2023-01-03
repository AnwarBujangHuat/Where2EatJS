import React from 'react';
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
import { BackButton } from 'atoms/BackButton';
import { ConstString } from 'configs/Strings';
import { xorBy } from 'lodash';
import addIcon from 'images/plus.png';
import { ModalMenu } from 'molecules/ModalMenu';
import { ModalUploading } from 'molecules/ModalUploading';
import { ModalMenuDetails } from 'molecules/ModalMenuDetails';
import { FoodCard } from 'molecules/FoodCard';
import { SearchButton } from 'atoms/SearchButton';
import { GStyles } from 'configs/styles';
import { colors } from 'configs/Const';
import MultiPickerBox from 'molecules/MultiPickerBox';

export const SetupMenuComponents = props => {
  const {
    onBackButton,
    categories,
    selectedCategory,
    setSelectedCategory,
    menuIcon,
    onPressAdd,
    showMenuDetails,
    editorMode,
    onPressDelete,
    onPressEdit,
    Menu,
    uploadMenu,
    isModalVisible,
    isActionModalVisible,
    isModalMenuVisible,
    closeModal,
    addFoodItem,
    Category,
    selectedFoodItem,
    updateFoodItem,
    closeActionModal,
    goBack,
    closeMenuDetails,
    onSearch,
    onChangeText,
    onPressSearch,
    foodList,
    action,
  } = props;
  const renderItem = ({ item }) => {
    return (
      <FoodCard
        onPress={() => showMenuDetails(item)}
        name={item.name}
        price={item.price}
        desc={item.desc}
        image={item.image}
        editable={true}
        onPressDelete={() => onPressDelete(item)}
        onPressEdit={() => onPressEdit(item)}
      />
    );
  };
  const renderMenu = category => {
    return editorMode
      ? //if Restaurant Exist and in Editor Mode then filter existing MENU
      foodList.filter(foods => foods.category === category)
      : //First time Create and not Editor Mode then show temp menu
      Menu.filter(foods => foods.category === category);
  };
  const renderSelectedCategory = () => {
    //Sort Category based on id to maintain order {Main Dish, Side Dish, Dessert, Appetizer, Drinks }
    return selectedCategory.sort((a, b) => {
      return a.id - b.id;
    });
  };
  return (
    <SafeAreaView style={GStyles.screens}>
      <View style={styles.rowContainer}>
        <BackButton onPress={onBackButton} />
        {editorMode && (
          <SearchButton
            onSearch={onSearch}
            onChangeText={onChangeText}
            onPress={onPressSearch}
          />
        )}
        {!onSearch && <Text style={styles.title}>{ConstString.MENU_BOOK}</Text>}
      </View>
      <Text
        style={{
          marginTop: 20,
          fontSize: 16,
          fontWeight: 'bold',
          paddingStart: 15,
          color: colors.primary,
        }}>
        Add Category
      </Text>
      <View style={styles.inputContainer}>
        <MultiPickerBox
          textColor={colors.white}
          label="Select Menu Category"
          options={categories}
          labelStyle={styles.label}
          listEmptyLabelStyle={styles.label}
          selectedValues={selectedCategory}
          onMultiSelect={item =>
            setSelectedCategory(xorBy(selectedCategory, [item], 'id'))
          }
          onTapClose={item =>
            setSelectedCategory(xorBy(selectedCategory, [item], 'id'))
          }
          isMulti
          arrowIconColor={colors.primary}
          searchIconColor={colors.primary}
          toggleIconColor={colors.primary}
          multiOptionContainerStyle={{
            backgroundColor: colors.primary,
          }}
          multiOptionsLabelStyle={{ fontSize: 16, color: 'white' }}
          selectedItemStyle={{
            fontSize: 16,
            color: colors.white,
          }}
          optionsLabelStyle={{
            fontSize: 16,
            color: colors.white,
          }}
        />
      </View>
      <FlatList
        data={renderSelectedCategory()}
        keyExtractor={item => item.id}
        style={{ marginTop: 10 }}
        renderItem={({ item }) => {
          const category = item.item;
          return (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                  marginHorizontal: 10,
                }}>
                <Text style={styles.header}>{category}</Text>
                <Image style={styles.icon} source={menuIcon(category)} />
                <View
                  style={{
                    flexDirection: 'row',
                    right: 5,
                    position: 'absolute',
                  }}>
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={() => {
                      onPressAdd({ item: category });
                    }}>
                    <Image style={styles.addIcon} source={addIcon} />
                    <Text
                      style={{
                        padding: 5,
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 12,
                      }}>
                      New Item
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <FlatList
                  data={renderMenu(category)}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={renderItem}
                />
              </View>
            </>
          );
        }}
      />
      {!editorMode && (
        <TouchableOpacity style={styles.button} onPress={uploadMenu}>
          <Text style={styles.buttonText}>Finish Setup Store</Text>
        </TouchableOpacity>
      )}
      {isModalVisible && (
        <ModalMenu
          isModalVisible={isModalVisible}
          closeModal={closeModal}
          addFoodItem={addFoodItem}
          Category={Category}
          foodItem={selectedFoodItem}
          updateFoodItem={updateFoodItem}
          editorMode={editorMode}
        />
      )}
      {isActionModalVisible && (
        <ModalUploading
          isModalVisible={isActionModalVisible}
          closeModal={closeActionModal}
          action={action}
          goBack={goBack}
        />
      )}
      {isModalMenuVisible && (
        <ModalMenuDetails
          closeModal={closeMenuDetails}
          isModalVisible={isModalMenuVisible}
          foodItem={selectedFoodItem}
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
  buttonContainer: {
    ...GStyles.shadowContainer,
    padding: 7,
    alignSelf: 'center',
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 20,
    elevation: 10,
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
  inputContainer: {
    marginTop: 10,
    marginHorizontal: 20,
    backgroundColor: colors.bg,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    color: colors.white,
  },
  button: {
    backgroundColor: colors.primary,
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    width: Dimensions.get('screen').width - 30,
    textTransform: 'uppercase',
    bottom: 30,
    position: 'absolute',
    marginHorizontal: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
    marginStart: 10,
  },
  buttonText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  rowContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
});
