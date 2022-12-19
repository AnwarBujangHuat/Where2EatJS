import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NavStack} from './app/navigation/NavStack';
import {useSelector} from 'react-redux';
import {StatusBar} from 'react-native';
import {getTheme} from './app/store/selector';
import EStyleSheet from 'react-native-extended-stylesheet';
import {ConstString} from './app/Strings';
import {DarkTheme, LightTheme} from './app/Colors';

export default function App() {
  const theme = useSelector(getTheme);
  EStyleSheet.build(theme === ConstString.LIGHT ? LightTheme : DarkTheme);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={
          theme === ConstString.LIGHT ? 'dark-content' : 'light-content'
        }
      />
      <NavStack />
    </NavigationContainer>
  );
}
