import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { Header } from '../../components/molecules/Header';
import personIcon from '../../assets/images/programmer.png';
import { SearchBar } from '../../components/molecules/SearchBar';
import search from '../../assets/images/search.png';
import {
  colors,
  Const,
} from '../../configs/Const';
import { ImageButton } from '../../components/atoms/ImageButton';
import { RestaurantCard } from '../../components/molecules/RestaurantCard';
import { FloatingActionButton } from '../../components/atoms/FloatingActionButtom';
import { ModalMenuButton } from '../../components/molecules/ModalMenuButton';
import TestIds from '../../../e2e/TestIDs';

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
    <SafeAreaView testID={TestIds.Home} style={styles.container}>
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
        />
      )}
      <SearchBar
        placeholder={'Search'}
        onChangeText={onSearch}
        source={search}
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
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  buttonContainer: {
    marginStart: 10,
  },
});
