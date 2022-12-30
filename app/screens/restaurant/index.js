import React, {
  useEffect,
  useState,
} from 'react';
import { ConstString } from 'configs/Strings';
import { useSelector } from 'react-redux';
import { icons } from 'configs/Const';
import { getCurrentRestaurant } from 'store/selector';
import { RestaurantComponents } from './components';
import { routes } from 'navigation/routes';

const categories = [
  { id: 1, item: ConstString.MAINDISH },
  { id: 2, item: ConstString.SIDEDISH },
  { id: 3, item: ConstString.DESSERT },
  { id: 4, item: ConstString.APPETIZER },
  { id: 5, item: ConstString.DRINKS },
];

export const Restaurant = ({ navigation, route }) => {
  const { id } = route.params || {};
  const restaurantInfo = useSelector(getCurrentRestaurant(id));
  const { category, food: foodItemList } = restaurantInfo;
  const [foodList, setFoodList] = useState(foodItemList);
  const [isModalVisible, setModalVisible] = useState(false);
  const [foodItem, setFoodItem] = useState();
  const [isPreview, setIsPreview] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const restaurantIcon = category ? icons[category] : icons.def;

  useEffect(() => {
    setFoodList(restaurantInfo.food);
  }, [restaurantInfo]);

  useEffect(() => {
    const tempCategory = categories.filter(category =>
      foodList.find(food => food.category === category.item),
    );
    setSelectedCategory(tempCategory);
  }, [foodList]);

  const onPress = item => {
    setFoodItem(item);
    setModalVisible(!isModalVisible);
  };
  const closePreviewModal = () => {
    setIsPreview(false);
  };
  const menuIcon = item => icons[item] ?? icons?.def;
  const closeModal = () => setModalVisible(false);
  const openPreviewModal = () => setIsPreview(true);
  const goToRating = () => navigation.navigate(routes.RATINGS, { id });
  const onBack = () => navigation.navigate(routes.HOME);
  const onPressFloatingButton = ({ item: action }) => {
    //If edit then go to Edit Restaurant general Information
    if (action === ConstString.EDIT) {
      return navigation.navigate(routes.REGISTER, { id });
    }

    //else go to Edit Menu Page
    navigation.navigate(routes.MENU, { id });
  };
  //Search
  const onChangeText = text => {
    if (!text) {
      return setFoodList(foodItemList);
    }
    const updateFoodList = foodList.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFoodList(updateFoodList);
  };
  const props = {
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
    foodItemList,
    foodList,
    onChangeText,
  };
  return <RestaurantComponents {...props} />;
};
