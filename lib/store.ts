import { configureStore } from '@reduxjs/toolkit';
import currencySelectReducer from './features/currencySelect/currencySelectSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      currencySelect: currencySelectReducer, // Updated name
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];