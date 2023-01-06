import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NavStack } from 'navigation/NavStack';
import { StatusBar } from 'react-native';

export default function App () {
  return (
    <NavigationContainer>
      {/*<StatusBar barStyle={'dark-content'} />*/}
      <StatusBar barStyle={'light-content'} />
      <NavStack />
    </NavigationContainer>
  );
}
