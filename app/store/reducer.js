import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import {
  addFoodItemFirebase,
  AddOne,
  changeTheme,
  PopulateRestaurantList,
  populateUserData,
  rememberMe,
  removeFoodItemFirebase,
  updateFoodItemFirebase,
  updateRating,
  updateRestaurantInfoFirestore,
} from './thunks';
import { ConstString } from 'configs/Strings';

export const restaurantAdapter = createEntityAdapter({
  sortComparer: (a, b) => a.restaurant.localeCompare(b.restaurant),
});
export const Reducer = createSlice({
  name: 'restaurant',
  initialState: {
    RESTAURANT: restaurantAdapter.getInitialState(),
    USER: {
      ID: '5yGZTuwy98cXhrEsf4qS9AxzWel2\n',
      NAME: 'Kasim Kaki Bangku',
      AGE: 21,
      EMAIL: 'Mohamad@gmail.com',
      PHONE: '0123456789',
      IMAGE: '',
    },
    THEME: ConstString.LIGHT,
    EMAIL: 'A177016@siswa.ukm.edu.my',
    PASSWORD: '12345678',
  },
  reducers: {
    restaurantUpdated: restaurantAdapter.updateOne,
  },
  extraReducers: builder => {
    builder.addCase(PopulateRestaurantList.fulfilled, (state, { payload }) => {
      const { restaurantList } = payload;
      restaurantAdapter.upsertMany(state.RESTAURANT, restaurantList);
      return state;
    });
    builder.addCase(PopulateRestaurantList.rejected, (state, { payload }) => {
      //Check if Restaurant List Is Empty
      if (state.RESTAURANT?.length < 0) {
        return restaurantAdapter.addOne(state.RESTAURANT, payload);
      }
      return state;
    });
    builder.addCase(AddOne.fulfilled, (state, { meta, payload }) => {
      const { id, data } = payload;
      const temp = { id: id, ...data };
      restaurantAdapter.addOne(state.RESTAURANT, temp);
      return state;
    });
    builder.addCase(AddOne.rejected, (state, payload) => {
      console.log({ path: 'store-addOne-rejected', state, payload });
    });
    builder.addCase(changeTheme.fulfilled, (state, { payload }) => {
      state.THEME = payload;
      return state;
    });

    builder.addCase(
      addFoodItemFirebase.fulfilled,
      (state, { meta, payload }) => {
        const { id: restaurantId, foodItem } = payload.data;
        const restaurantFoodList = [
          ...state.RESTAURANT.entities[restaurantId].food,
          foodItem,
        ];
        restaurantAdapter.updateOne(state.RESTAURANT, {
          id: restaurantId,
          changes: {
            food: restaurantFoodList,
          },
        });
        return state;
      },
    );
    builder.addCase(
      addFoodItemFirebase.rejected,
      (state, { meta, payload }) => {
        console.log({ path: 'reducer AddFoodItemFirebase', data: payload });
      },
    );

    builder.addCase(updateRating.fulfilled, (state, { meta, payload }) => {
      const {
        id: restaurantId,
        avg: rate,
        userReviewResult: ratings,
        index,
      } = payload;
      const restaurantRatings = [
        ...state.RESTAURANT.entities[restaurantId].rating,
      ];
      let updatedRating = restaurantRatings;
      //if Exist then Replace
      if (index > -1) {
        updatedRating[index] = ratings;
      }
      //else Add
      else {
        updatedRating = [...restaurantRatings, ratings];
      }
      restaurantAdapter.updateOne(state.RESTAURANT, {
        id: restaurantId,
        changes: {
          rate: rate,
          rating: updatedRating,
        },
      });
    });
    builder.addCase(updateRating.rejected, (state, payload) => {});
    builder.addCase(
      removeFoodItemFirebase.fulfilled,
      (state, { meta, payload }) => {
        const { id, index } = payload.data;
        const foodArray = [...state.RESTAURANT.entities[id].food];
        if (index > -1) {
          foodArray.splice(index, 1);
          restaurantAdapter.updateOne(state.RESTAURANT, {
            id: id,
            changes: {
              food: foodArray,
            },
          });
        }
      },
    );
    builder.addCase(
      updateRestaurantInfoFirestore.fulfilled,
      (state, { meta, payload }) => {
        const {
          id,
          restaurantName,
          selectedTypes,
          restaurantLocation,
          restaurantDesc,
          image,
        } = payload.data;
        restaurantAdapter.updateOne(state.RESTAURANT, {
          id: id,
          changes: {
            restaurant: restaurantName,
            category: selectedTypes,
            address: restaurantLocation,
            description: restaurantDesc,
            image: image,
          },
        });
      },
    );

    builder.addCase(
      updateRestaurantInfoFirestore.rejected,
      (state, { meta, payload }) => {},
    );
    builder.addCase(populateUserData.fulfilled, (state, { meta, payload }) => {
      const { userInformation, uid } = payload.data;
      const { NAME, AGE, EMAIL, IMAGE } = userInformation;
      state.USER = {
        ID: uid,
        NAME: NAME,
        AGE: AGE,
        EMAIL: EMAIL,
        IMAGE: IMAGE,
      };
      return state;
    });

    builder.addCase(removeFoodItemFirebase.rejected, (state, payload) => {
      console.log({ path: 'store-removeOne-rejected', payload });
    });

    builder.addCase(
      updateFoodItemFirebase.fulfilled,
      (state, { meta, payload }) => {
        const { id: restaurantId, foodItem, index } = payload.data;
        const foodItemList = [...state.RESTAURANT.entities[restaurantId].food];
        let updatedFoodItemList = foodItemList;
        //if Exist then Replace
        if (index > -1) {
          updatedFoodItemList[index] = foodItem;
        }
        //else Add
        else {
          updatedFoodItemList = [...foodItemList, foodItem];
        }
        restaurantAdapter.updateOne(state.RESTAURANT, {
          id: restaurantId,
          changes: {
            food: updatedFoodItemList,
          },
        });
      },
    );
    builder.addCase(updateFoodItemFirebase.rejected, (state, payload) => {});

    builder.addCase(rememberMe.fulfilled, (state, { meta, payload }) => {
      const { EMAIL, PASSWORD } = payload;
      state.PASSWORD = PASSWORD;
      state.EMAIL = EMAIL;

      return state;
    });
  },
});
export default Reducer.reducer;
