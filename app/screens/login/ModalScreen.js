import * as React from 'react';
import { useEffect } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { PopulateRestaurantList } from '../../store/thunks';
import { useDispatch } from 'react-redux';
import LottieView from 'lottie-react-native';
import Welcome from '../../assets/lottie/welcome.json';
import TestIDs from '../../../e2e/TestIDs';
import { routes } from '../../navigation/routes';
import { colors } from '../../configs/Const';

const { width } = Dimensions.get('window');

export const ModalScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const fetch = async() => {
    const response = await dispatch(PopulateRestaurantList());
    const { payload } = response;
    if (!payload.result) {
      return Alert.alert(
        'Opps',
        'Make Sure You Have Internet Connection',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate(routes.LOGIN),
          },
        ],
        { cancelable: true },
      );
    }
    setTimeout(() => navigation.navigate(routes.HOME), 1000);
  };
  useEffect(() => {
    fetch().then();
  }, []);

  return (
    <SafeAreaView testID={TestIDs.ModalScreen} style={styles.screen}>
      <LottieView
        source={Welcome}
        autoPlay={true}
        style={{
          height: width * 0.7,
          width: width * 0.7,
        }}
      />
    </SafeAreaView>
  );
};
export const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },
});
