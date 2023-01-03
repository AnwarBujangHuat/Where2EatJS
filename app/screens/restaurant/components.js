import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { DetailsHeader } from 'molecules/DetailsHeader';
import { DescriptionLabel } from 'molecules/DescriptionLabel';
import { FoodCard } from 'molecules/FoodCard';
import { ModalMenuDetails } from 'molecules/ModalMenuDetails';
import { ModalWinner } from 'molecules/ModalWinner';
import { ExpandableFloatingButton } from 'atoms/ExpandableFloatingButton';
import { colors } from 'configs/Const';
import { GStyles } from 'configs/styles';

export const RestaurantComponents = props => {
  const {
    isModalVisible,
    foodItem,
    restaurantInfo,
    onPress,
    selectedCategory,
    onBack,
    restaurantIcon,
    closeModal,
    menuIcon,
    isPreview,
    closePreviewModal,
    openPreviewModal,
    goToRating,
    onPressFloatingButton,
    foodList,
    onChangeText,
  } = props;
  const { restaurant, address, rate, image } = restaurantInfo;
  const renderItem = ({ item }) => {
    return (
      <FoodCard
        onPress={() => onPress(item)}
        name={item.name}
        price={item.price}
        desc={item.desc}
        image={item.image}
      />
    );
  };
  const renderMenu = category => {
    return foodList.filter(foods => foods.category === category);
  };
  return (
    <SafeAreaView style={styles.container}>
      <DetailsHeader
        image={image}
        back={onBack}
        disabled={true}
        rate={true}
        goToRating={goToRating}
        rating={rate}
        onSearch={true}
        onChangeText={onChangeText}
      />
      <DescriptionLabel
        name={restaurant}
        location={address}
        icon={restaurantIcon}
        onPress={openPreviewModal}
      />
      <FlatList
        data={selectedCategory}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          const category = item.item;
          return (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text style={styles.header}>{category}</Text>
                <Image style={styles.icon} source={menuIcon(category)} />
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
      <ExpandableFloatingButton onPressItem={onPressFloatingButton} />
      {isModalVisible && (
        <ModalMenuDetails
          closeModal={closeModal}
          isModalVisible={isModalVisible}
          foodItem={foodItem}
        />
      )}
      {isPreview && (
        <ModalWinner
          closeModal={closePreviewModal}
          isModalVisible={isPreview}
          selectedRestaurant={restaurantInfo}
          isPreview={true}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    ...GStyles.screens,
    paddingBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
    color: colors.darkPurple,
  },
  fabText: {
    padding: 5,
    color: colors.white,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 14,
  },
  icon: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
});
