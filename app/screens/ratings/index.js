import React, {
  useEffect,
  useState,
} from 'react';
import { RatingComponents } from './components';
import { ConstString } from 'configs/Strings';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import {
  getCurrentRestaurant,
  getUser,
} from 'store/selector';
import { Alert } from 'react-native';
import { updateRating } from 'store/thunks';
import { routes } from 'navigation/routes';

export const Ratings = ({ navigation, route }) => {
  const ratingChipButton = ['All', '1', '2', '3', '4', '5'];
  const { id } = route.params || {};
  const dispatch = useDispatch();
  const { NAME, ID } = useSelector(getUser);
  const restaurantInfo = useSelector(getCurrentRestaurant(id));
  const restaurantsRating = [...(restaurantInfo.rating ?? [])];
  const [restaurantRemove, setRestaurantRemove] = useState([]);
  const [restaurantList, setRestaurantList] = useState(restaurantsRating);
  const [isSelectedRating, setSelectedRating] = useState(ratingChipButton[0]);
  const onSelectedRating = item => {
    const selectedRestaurantRate =
      item !== 'All'
        ? restaurantRemove.filter(rate => rate.rating === parseInt(item))
        : restaurantRemove;
    setRestaurantList(selectedRestaurantRate);
    setSelectedRating(item);
  };
  const [isModalRateOpen, setModalRate] = useState(false);
  const [userReview, setUserReview] = useState({});
  const [isFirstTimeRate, setFirstTime] = useState(true);
  const [isCurrentRating, setCurrentRating] = useState(
    restaurantInfo.rate ?? 3.5,
  );
  const [ratingCount, setRatingCount] = useState();
  const userReviews = restaurantsRating.find(item => item?.userId === ID) ?? '';
  const index = restaurantsRating.indexOf(userReviews);
  const getTotalCount = restaurantsRating => {
    const temp = [];
    ratingChipButton.forEach(rating => {
      if (rating !== 'All') {
        const totalCount = restaurantsRating.reduce(
          (acc, cur) => (cur.rating === parseInt(rating) ? ++acc : acc),
          0,
        );
        temp.push(totalCount);
      }
    });
    const reverseCount = [...temp].reverse();
    setRatingCount(reverseCount);
  };
  useEffect(() => {
    if (userReviews) {
      setFirstTime(false);
      setUserReview(userReviews);
    }
    if (restaurantInfo?.rating) {
      getTotalCount(restaurantInfo.rating);
    }
    if (index > -1) {
      restaurantsRating.splice(index, 2);
    }
    setRestaurantRemove(restaurantsRating);
  }, [restaurantInfo]);
  const onBackButton = () => navigation.navigate(routes.RESTAURANT, { id });
  const openModal = () => {
    setModalRate(true);
  };
  const closeModal = result => {
    setFirstTime(false);
    setModalRate(false);
    if (result === ConstString.FAILED) {
      Alert.alert(
        'Something Went Wrong While Writing Your Review',
        'Opps',
        { text: 'OK' },
        { cancelable: true },
      );
    }
  };
  const submit = async(text, newRate = 1) => {
    const currentDate = new Date().toLocaleString();
    const userReviewResult = {
      userId: ID,
      userName: NAME,
      review: text,
      rating: parseInt(newRate ?? 0),
      createdAt: isFirstTimeRate ? currentDate : userReview.createdAt,
      updatedAt: isFirstTimeRate ? '' : currentDate,
    };
    const avg =
      Math.round(
        ((restaurantsRating.reduce((r, c) => r + c.rating, 0) + newRate) /
          (restaurantsRating.length + 1)) *
        10,
      ) / 10;
    setCurrentRating(avg !== undefined ? avg : 2.5);

    //dispatch call to update firebase and redux
    const result = await dispatch(
      updateRating({ id, userReview, userReviewResult, avg, index }),
    );
    const { error } = result;
    //check error then Failed
    closeModal(error ? ConstString.FAILED : ConstString.SUCCESS);
  };
  const props = {
    onBackButton,
    restaurantInfo,
    isModalRateOpen,
    closeModal,
    submit,
    userReview,
    isCurrentRating,
    restaurantRemove,
    ratingCount,
    openModal,
    isFirstTimeRate,
    restaurantList,
    ratingChipButton,
    onSelectedRating,
    isSelectedRating,
  };
  return <RatingComponents {...props} />;
};
