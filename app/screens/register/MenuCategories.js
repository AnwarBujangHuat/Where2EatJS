import { ConstString } from '../../Strings';
import mainDishIcon from '../../assets/mainDish.png';
import sideIcon from '../../assets/sides.png';
import beveragesIcon from '../../assets/beverages.png';
import dessertIcon from '../../assets/dessert.png';
import appetizerIcon from '../../assets/appetizer.png';

export const menuCategories = [
  {
    item: ConstString.MAINDISH,
    icon: mainDishIcon
  },
  {
    item: ConstString.SIDEDISH,
    icon: sideIcon
  },
  {
    item: ConstString.DESSERT,
    icon: dessertIcon
  },
  {
    item: ConstString.APPETIZER,
    icon: appetizerIcon
  },
  {
    item: ConstString.DRINKS,
    icon: beveragesIcon
  },

];