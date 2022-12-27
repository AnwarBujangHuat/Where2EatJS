import { ConstString } from './Strings';
import burgerIcon from '../assets/images/cheeseburger.png';
import malayIcon from '../assets/images/nasi-lemak.png';
import chineseIcon from '../assets/images/buns.png';
import indianIcon from '../assets/images/masala-dosa.png';
import borneoIcon from '../assets/images/bakso.png';
import japaneseIcon from '../assets/images/ramen.png';
import drinksIcon from '../assets/images/drinks.png';
import fruitsIcon from '../assets/images/fruit.png';
import mainDishIcon from '../assets/images/mainDish.png';
import sideIcon from '../assets/images/sides.png';
import beveragesIcon from '../assets/images/beverages.png';
import dessertIcon from '../assets/images/dessert.png';
import appetizerIcon from '../assets/images/appetizer.png';
import facebookIcon from '../assets/images/facebook.png';
import twitterIcon from '../assets/images/twitter.png';
import googleIcon from '../assets/images/google.png';

const theme = 1;
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
