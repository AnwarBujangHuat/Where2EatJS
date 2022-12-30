import React, {
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';
import { ConstString } from 'configs/Strings';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  addFoodItemFirebase,
  AddOne,
  removeFoodItemFirebase,
  updateFoodItemFirebase,
} from 'store/thunks';
import { icons } from 'configs/Const';
import { firebase } from '../../../../src/firebase/config';
import { getCurrentRestaurant } from 'store/selector';
import { SetupMenuComponents } from './components';
import { routes } from 'navigation/routes';
import { v4 as uuid } from 'uuid';

export const SetupMenu = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const categories = [
    { id: 1, item: ConstString.MAINDISH },
    { id: 2, item: ConstString.SIDEDISH },
    { id: 3, item: ConstString.DESSERT },
    { id: 4, item: ConstString.APPETIZER },
    { id: 5, item: ConstString.DRINKS },
  ];
  const { item, id } = route.params || {};
  const editorMode = !!id;
  let action; //clear - on back
  const restaurantInfo = useSelector(getCurrentRestaurant(id));
  const foodItemLists = editorMode ? [...restaurantInfo?.food] : [];
  const [foodList, setFoodList] = useState(foodItemLists);
  const [selectedCategory, setSelectedCategory] = useState(categories);
  const [isModalMenuVisible, setIsModalMenuVisible] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState({});
  const [isActionModalVisible, setActionModal] = useState(false);
  const [onSearch, setOnSearch] = useState(false);
  const [Category, setCategory] = useState('');
  const [Menu, setMenu] = useState([]);

  useEffect(() => {
    selectedCat();
  }, [foodList]);

  useEffect(() => {
    setFoodList(foodItemLists);
  }, [restaurantInfo]);

  const selectedCat = () => {
    const tempCategory = categories.filter(category =>
      foodList.find(food => food.category === category.item),
    );
    setSelectedCategory(tempCategory);
  };
  const showAlert = (action, foodItem, result) => {
    result === ConstString.SUCCESS
      ? Alert.alert('Congratulation', foodItem + ' is Successfully ' + action, [
        {
          onPress: () => closeModal(),
          text: 'Okay',
        },
      ])
      : //Error Handling Alert
      Alert.alert('Sorry', foodItem + ' cannot be ' + action, [
        {
          onPress: () => closeModal(),
          text: 'Okay',
        },
      ]);
  };
  const onBackButton = () => {
    if (selectedCategory.length > 0 && !editorMode) {
      setActionModal(true);
      action = ConstString.GO_BACK;
    } else {
      goBack();
    }
  };
  const goBack = () => {
    closeActionModal();
    closeModal();
    navigation.goBack({ id });
  };
  const closeModal = () => setModalVisible(false);
  const closeActionModal = () => setActionModal(false);
  const menuIcon = item => icons[item] ?? icons?.def;
  const showMenuDetails = item => {
    setSelectedFoodItem(item);
    setIsModalMenuVisible(true);
  };
  const closeMenuDetails = () => setIsModalMenuVisible(false);

  //Upload new Restaurant to Firebase
  const uploadMenu = async() => {
    setActionModal(true);
    action = ConstString.UPLOADING;
    const resultUploadImageProfile = await uploadAsFile(item.image, 'profile');
    const { data, error } = resultUploadImageProfile;
    if (error) {
      return showAlert(ConstString.ADD, 'Profile Image', ConstString.FAILED);
    }
    item.image = data;

    //Looping thru all foodItem Added
    for (const foodItem of Menu) {
      if (foodItem.image) {
        const resultUploadImage = await uploadAsFile(
          foodItem.image,
          'menu',
          foodItem.category,
          0,
          foodItem,
        );
        const { data, error } = resultUploadImage;
        if (error) {
          return showAlert(ConstString.ADD, foodItem.name, ConstString.FAILED);
        }
        foodItem.image = data;
      }
    }
    await uploadFinish();
  };
  const uploadFinish = async() => {
    item.food = Menu;
    const addRestaurantResult = await dispatch(AddOne(item));
    const { result } = addRestaurantResult;
    if (result) {
      return showAlert(ConstString.ADD, item.restaurant, ConstString.FAILED);
    }
    setActionModal(false);
    navigation.navigate(routes.HOME);
  };
  //Upload Image to Firebase
  const uploadAsFile = async(
    uri,
    folder,
    category,
    index,
    foodItem,
    imageName,
    progressCallback,
  ) => {
    if (uri !== undefined) {
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageIndex = imageName?.indexOf('media.jpg');
      const name = imageName
        ? imageName.slice(imageIndex - 8, imageIndex) + 'media.jpg'
        : uuid() + 'media.jpg';
      const restaurantName = editorMode
        ? restaurantInfo.restaurant
        : item.restaurant;
      const pathName =
        folder === 'profile'
          ? restaurantName + '/' + folder + '/' + 'profilemedia.jpg'
          : restaurantName + '/' + folder + '/' + category + '/' + name;
      const metadata = {
        contentType: 'image/jpeg',
      };
      const ref = firebase.storage().ref().child(pathName);
      const task = ref.put(blob, metadata);
      return new Promise((resolve, reject) => {
        task.on(
          'state_changed',
          snapshot => {
            progressCallback &&
            progressCallback(snapshot.bytesTransferred / snapshot.totalBytes);
          },
          error => {
            reject(error);
          },
          () => {
            task.snapshot.ref.getDownloadURL().then(fileUrl => {
              if (folder === 'profile') {
                resolve({ type: 'profile', data: fileUrl });
              } else {
                resolve({ type: 'menu', data: fileUrl });
              }
            });
          },
        );
      });
    } else {
      showAlert('Missing File' + category);
    }
  };

  //Add New Food Item
  const onPressAdd = ({ item: category }) => {
    setModalVisible(true);
    setCategory(category);
  };
  const addFoodItem = async foodItem => {
    if (!editorMode) {
      const temp = [...Menu, foodItem];
      setMenu(temp);
      closeModal();
    } else {
      const resultUploadImage = await uploadAsFile(
        foodItem.image,
        'menu',
        foodItem.category,
        0,
        foodItem,
      );
      const { data } = resultUploadImage;
      foodItem.image = data;
      const resultUploadFoodItem = await dispatch(
        addFoodItemFirebase({ id, foodItem }),
      );
      const { payload } = resultUploadFoodItem;
      //If fail to add Firestore
      if (!payload.result) {
        return showAlert(ConstString.ADD, foodItem.name, ConstString.FAILED);
      }

      showAlert(ConstString.ADD, foodItem.name, ConstString.SUCCESS);
    }
  };

  //Edit Existing Food Item
  const onPressEdit = item => {
    setSelectedFoodItem(item);
    setCategory('');
    setModalVisible(true);
  };
  const updateFoodItem = async(action, foodItem, reUpload) => {
    const initialFoodItem = selectedFoodItem ?? {};
    const index = foodItemLists.indexOf(initialFoodItem);
    //New restaurant update temp Menu
    if (!editorMode) {
      const tempMenu = [...Menu];
      const menuIndex = Menu.indexOf(initialFoodItem);
      tempMenu[menuIndex] = foodItem;
      setMenu(tempMenu);
      closeModal();
    }
    //update firestore Menu
    else {
      //update

      //no need to upload new image
      if (reUpload) {
        const updateFoodItemResult = await dispatch(
          updateFoodItemFirebase({ id, foodItem, initialFoodItem, index }),
        );
        const { payload } = updateFoodItemResult;

        //If fail to update Firestore
        if (!payload.result) {
          return showAlert(
            ConstString.UPDATE,
            foodItem.name,
            ConstString.FAILED,
          );
        }

        showAlert(ConstString.UPDATE, foodItem.name, ConstString.SUCCESS);
      } else {
        //upload and replace foodItem image in firebase and storage
        const resultUploadImage = await uploadAsFile(
          foodItem.image,
          'menu',
          foodItem.category,
          0,
          foodItem,
          initialFoodItem.image,
        );
        const { data } = resultUploadImage;
        foodItem.image = data;

        //upload new food Item to firestore
        const resultUploadFoodItem = await dispatch(
          updateFoodItemFirebase({ id, foodItem, initialFoodItem, index }),
        );
        const { payload } = resultUploadFoodItem;

        //If fail to update Firestore
        if (!payload.result) {
          return showAlert(
            ConstString.UPDATE,
            foodItem.name,
            ConstString.FAILED,
          );
        }

        showAlert(ConstString.UPDATE, foodItem.name, ConstString.SUCCESS);
      }
    }
  };

  //Delete Food Item
  const onPressDelete = item => {
    Alert.alert(
      'This Cannot be UNDO!',
      'Do you wish to delete ' + item.name,
      [
        {
          text: 'Delete',
          onPress: () => removeFoodItem(id, item),
          style: 'destructive',
        },
        { text: 'Cancel' },
      ],
      { cancelable: true },
    );
  };
  const removeFoodItem = async(id, foodItem) => {
    const index = foodItemLists.indexOf(foodItem);
    if (!editorMode) {
      const menuIndex = Menu.indexOf(selectedFoodItem);
      const temp = [...Menu];
      temp.splice(menuIndex, 1);
      setMenu(temp);
    } else {
      const restaurantName = restaurantInfo?.restaurant;
      const resultRemoveFoodItem = await dispatch(
        removeFoodItemFirebase({ id, foodItem, index, restaurantName }),
      );
      const { payload } = resultRemoveFoodItem;
      //If fail to add Firestore
      if (!payload.result) {
        return showAlert(ConstString.DELETE, foodItem.name, ConstString.FAILED);
      }

      showAlert(ConstString.DELETE, foodItem.name, ConstString.SUCCESS);
    }
  };

  //Search
  const onChangeText = text => {
    if (!text) {
      return setFoodList(foodItemLists);
    }
    const updateFoodList = foodItemLists.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFoodList(updateFoodList);
  };
  const onPressSearch = () => {
    setOnSearch(!onSearch);
    setFoodList([...restaurantInfo?.food]);
    if (!onSearch) {
      selectedCat();
    }
  };

  const props = {
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
    foodItemLists,
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
    action,
    onSearch,
    onChangeText,
    onPressSearch,
    foodList,
  };
  return <SetupMenuComponents {...props} />;
};
