import {
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import { FloatingAction } from 'react-native-floating-action';
import Menu from 'images/cheeseburger.png';
import Details from 'images/details.png';
import Edit from 'images/edit.png';
import { ConstString } from 'configs/Strings';
import { colors } from 'configs/Const';
import { GStyles } from 'configs/styles';

const actions = [
  {
    text: 'Restaurant Details',
    icon: Details,
    name: ConstString.EDIT,
    position: 2,
    color: colors.primary,
    textBackground: colors.primary,
    textColor: 'white',
  },
  {
    text: 'Menu',
    icon: Menu,
    name: ConstString.MENU,
    position: 1,
    color: colors.primary,
    textBackground: colors.primary,
    textColor: 'white',
  },
];
export const ExpandableFloatingButton = ({ onPressItem }) => {
  return (
    <View style={styles.fab}>
      <FloatingAction
        actions={actions}
        buttonSize={60}
        floatingIcon={Edit}
        iconWidth={28}
        iconHeight={28}
        color={colors.primary}
        onPressItem={item => onPressItem({ item })}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  fabContainer: {
    ...GStyles.shadowContainer,
    borderRadius: 40,
    padding: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: -10,
  },
});
