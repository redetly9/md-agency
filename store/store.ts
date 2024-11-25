import { configureStore } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CityState {
  selectedCity: string | null;
}

const initialState: CityState = {
  selectedCity: 'astana',
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<string | null>) {
      state.selectedCity = action.payload;
    },
  },
});

export const { setCity } = citySlice.actions;

export const store = configureStore({
  reducer: {
    city: citySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
