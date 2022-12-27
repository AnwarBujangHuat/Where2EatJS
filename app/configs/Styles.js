import { colors } from './Const';
import { StyleSheet } from 'react-native';

export const GStyles = StyleSheet.create({
  shadowContainer: {
    backgroundColor: colors.secondBg,
    shadowOffset: { width: -2, height: 4 },
    shadowColor: colors.primary,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
  },
});
