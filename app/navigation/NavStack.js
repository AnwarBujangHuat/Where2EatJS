import { ConstString } from '../Strings';
import {
  Home,
  Login,
  ModalScreen,
  Profile,
  Register,
  Restaurant,
  SetupMenu,
  WheelOfFortune,
  Ratings,
  Location
} from '../screens';
import BottomNavigationBar from './bottom/BottomNavigationBar';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { getTheme } from '../store/selector';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  DarkTheme,
  LightTheme
} from '../Colors';

const Stack = createStackNavigator();
export const NavStack = () => {
  const theme = useSelector(getTheme);
  EStyleSheet.build(theme === ConstString.LIGHT ? LightTheme : DarkTheme);

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <Stack.Navigator
      // initialRouteName={ConstString.MODAL}
      initialRouteName={ConstString.LOGIN}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name={ConstString.LOGIN} component={Login} options={{}} />
      <Stack.Screen
        name={ConstString.MODAL}
        component={ModalScreen}
        options={{
          presentation: 'transparentModal',
          cardStyleInterpolator: forFade
        }}
      />
      {/*<Stack.Screen name={ConstString.BOTTOM} component={BottomNavigationBar} />*/}
      <Stack.Screen name={ConstString.HOME} component={Home} options={{ cardStyleInterpolator: forFade }} />
      <Stack.Screen name={ConstString.REGISTER} component={Register} />
      <Stack.Screen name={ConstString.RESTAURANT} component={Restaurant} />
      <Stack.Screen name={ConstString.ROULETTE} component={WheelOfFortune} />
      <Stack.Screen name={ConstString.MENU} component={SetupMenu} />
      <Stack.Screen name={ConstString.PROFILE} component={Profile} />
      <Stack.Screen name={ConstString.RATINGS} component={Ratings} />
      <Stack.Screen name={ConstString.LOCATION} component={Location} />

    </Stack.Navigator>
  );
};
