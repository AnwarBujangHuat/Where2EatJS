import { createSelector } from '@reduxjs/toolkit';
import { restaurantAdapter } from './reducer';

const { selectAll, selectById } = restaurantAdapter.getSelectors(
  state => state,
);
export const getRestaurant = createSelector(
  state => state.restaurant.RESTAURANT,
  state => selectAll(state),
);
export const getCurrentRestaurant = id =>
  createSelector(
    state => state.restaurant.RESTAURANT,
    state => selectById(state, id),
  );
export const getUser = createSelector(
  state => state,
  state => state.restaurant.USER,
);
export const getTheme = createSelector(
  state => state,
  state => state.restaurant.THEME,
);
export const getInfo = createSelector(
  state => state.restaurant,
  items => ({
    EMAIL: items.EMAIL,
    PASSWORD: items.PASSWORD,
  }),
);
