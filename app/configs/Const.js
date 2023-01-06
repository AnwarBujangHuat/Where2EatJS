import { ConstString } from './Strings';
import burgerIcon from 'images/cheeseburger.png';
import malayIcon from 'images/nasi-lemak.png';
import chineseIcon from 'images/buns.png';
import indianIcon from 'images/masala-dosa.png';
import borneoIcon from 'images/bakso.png';
import japaneseIcon from 'images/ramen.png';
import drinksIcon from 'images/drinks.png';
import fruitsIcon from 'images/fruit.png';
import mainDishIcon from 'images/mainDish.png';
import sideIcon from 'images/sides.png';
import beveragesIcon from 'images/beverages.png';
import dessertIcon from 'images/dessert.png';
import appetizerIcon from 'images/appetizer.png';
import facebookIcon from 'images/facebook.png';
import twitterIcon from 'images/twitter.png';
import googleIcon from 'images/google.png';

const theme = 0;
export const icons = {
  [ConstString.WESTERN]: burgerIcon,
  [ConstString.MALAY]: malayIcon,
  [ConstString.CHINESE]: chineseIcon,
  [ConstString.INDIAN]: indianIcon,
  [ConstString.BORNEO]: borneoIcon,
  [ConstString.JAPANESE]: japaneseIcon,
  [ConstString.DRINKS]: drinksIcon,
  [ConstString.DESSERT]: fruitsIcon,
  [ConstString.MAINDISH]: mainDishIcon,
  [ConstString.SIDEDISH]: sideIcon,
  [ConstString.DESSERT]: dessertIcon,
  [ConstString.APPETIZER]: appetizerIcon,
  [ConstString.BEVERAGES]: beveragesIcon,
  [ConstString.GOOGLE]: googleIcon,
  [ConstString.TWITTER]: twitterIcon,
  [ConstString.FACEBOOK]: facebookIcon,
  def: burgerIcon,
  defMenu: sideIcon,
};
export const Const = [
  {
    title: ConstString.WESTERN,
    icon: burgerIcon,
  },
  {
    title: ConstString.MALAY,
    icon: malayIcon,
  },
  {
    title: ConstString.CHINESE,
    icon: chineseIcon,
  },
  {
    title: ConstString.INDIAN,
    icon: indianIcon,
  },
  {
    title: ConstString.BORNEO,
    icon: borneoIcon,
  },
  {
    title: ConstString.JAPANESE,
    icon: japaneseIcon,
  },
  {
    title: ConstString.DRINKS,
    icon: drinksIcon,
  },
  {
    title: ConstString.DESSERT,
    icon: fruitsIcon,
  },
];
export const colors = {
  black: '#000',
  white: theme ? '#fff' : '#000',
  primary: '#915bff',
  secondBg: theme ? '#1C1424' : '#fff',
  // secondBg: theme ? '#1b1424' : '#fff',
  bg: theme ? '#1A1125' : '#fefefe',
  darkPurple: '#9c6bff',
  lightPurple: '#DED8E1',
  offPurple: '#e2d5f0',
};
