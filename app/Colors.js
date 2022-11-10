import { ConstString } from './Strings';

export const Colors = 'Light' === ConstString.LIGHT ? {
  primaryColor: '#7835FF',
  secondaryColor: '#05000f',
  tertiaryColor: '#6d5a75',
  lightPrimaryColor: '#894eff',
  whitTextColor: '#fff',
  primaryTextColor: '#7835FF',
  secondaryTextColor: '#1a004f',
  tertiaryTextColor: '#6d5a75',
  backGroundColor: '#fefefe',
  secondaryBackGroundColor: '#fff',
  greyBackground: '#F5F5F5',
  lightBackground: '#f4eafe',
  secondaryPurple: '#8e7dc4'
} : {
  primaryColor: '#915bff',
  secondaryColor: '#1a004f',
  tertiaryColor: '#DED8E1',
  lightPrimaryColor: '#894eff',
  primaryTextColor: '#9c6bff',
  secondaryTextColor: '#e2d5f0',
  whitTextColor: '#fff',
  tertiaryTextColor: '#e2d5f0',
  secondaryBackGroundColor: '#1b1424',
  backGroundColor: '#1A1125',
  greyBackground: '#1d1233',
  lightBackground: '#f4eafe',
  secondaryPurple: '#8e7dc4'
};
export const DarkTheme = {
  $theme: 'Dark',
  $primaryColor: '#915bff',
  $secondaryColor: '#1a004f',
  $tertiaryColor: '#DED8E1',
  $lightPrimaryColor: '#894eff',
  $primaryTextColor: '#9c6bff',
  $secondaryTextColor: '#e2d5f0',
  $whitTextColor: '#fff',
  $tertiaryTextColor: '#e2d5f0',
  $secondaryBackGroundColor: '#1b1424',
  $backGroundColor: '#1A1125',
  $greyBackground: '#1d1233',
  $lightBackground: '#f4eafe',
  $secondaryPurple: '#8e7dc4',
  $ModalBackground: '#1d1233',

};
export const LightTheme = {
  $theme: 'Light',
  $primaryColor: '#7835FF',
  $secondaryColor: '#05000f',
  $tertiaryColor: '#6d5a75',
  $lightPrimaryColor: '#894eff',
  $whitTextColor: '#fff',
  $primaryTextColor: '#9c6bff',
  $secondaryTextColor: '#1a004f',
  $tertiaryTextColor: '#6d5a75',
  $backGroundColor: '#fefefe',
  $secondaryBackGroundColor: '#fff',
  $greyBackground: '#F5F5F5',
  $lightBackground: '#f4eafe',
  $ModalBackground: '#1a004f'
};
