import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Header } from 'molecules/Header';
import personIcon from 'images/programmer.png';
import { SearchBar } from 'molecules/SearchBar';
import {
  Const,
  icons,
} from 'configs/Const';
import { ImageButton } from 'atoms/ImageButton';
import { RestaurantCard } from 'molecules/RestaurantCard';
import { FloatingActionButton } from 'atoms/FloatingActionButtom';
import { ModalMenuButton } from 'molecules/ModalMenuButton';
import TestIds from '../../../e2e/TestIDs';
import { GStyles } from 'configs/styles';
import { ConstString } from 'configs/Strings';

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
export const HomeComponents = props => {
  const {
    selectedTypes,
    currentRestaurant,
    onClickCategoryChip,
    isOpenMenu,
    onSearch,
    gotoRoulette,
    openMenu,
    goToRestaurant,
    closeModal,
    onNavigate,
    isFetching,
    reFresh,
    IMAGE,
    userName,
  } = props;
  const renderItem = ({ item }) => {
    return (
      <RestaurantCard
        onPress={() => goToRestaurant(item.id)}
        name={item.restaurant}
        category={item.category}
        address={item.address}
        rate={item.rate}
        image={item.image}
        description={item.description}
      />
    );
  };

  return (
    <SafeAreaView testID={TestIds.Home} style={GStyles.screens}>
      <Header
        source={IMAGE ? { uri: IMAGE } : personIcon}
        onPress={openMenu}
        title={'Welcome Back ' + userName}
      />
      {isOpenMenu && (
        <ModalMenuButton
          isModalVisible={isOpenMenu}
          onPress={onNavigate}
          closeModal={closeModal}
          menuOptions={MENU_OPTIONS}
        />
      )}
      <SearchBar
        placeholder={'Search'}
        onChangeText={onSearch}
        source={icons[ConstString.SEARCH]}
      />
      <View style={styles.buttonContainer}>
        <FlatList
          data={Const}
          renderItem={({ item }) => {
            return (
              <ImageButton
                item={item}
                onPress={() => onClickCategoryChip(item.title)}
                selected={selectedTypes}
              />
            );
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <FlatList
        data={currentRestaurant}
        onRefresh={reFresh}
        refreshing={isFetching}
        renderItem={renderItem}
        maxToRenderPerBatch={4}
        initialNumToRender={3}
        removeClippedSubviews={true}
        keyExtractor={(item, index) => index}
        showsHorizontalScrollIndicator={false}
      />
      <FloatingActionButton onPress={gotoRoulette} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    marginStart: 10,
  },
});
