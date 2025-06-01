import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencySelect {
  coin: string;
  decimal: number;
  id: number;
  txt:string;
}

const initialState: CurrencySelect = {
  coin: "bitcoin",
  decimal: 2,
  id: 0,
  txt:"BTC"
};

const currencySelectSlice = createSlice({
  name: 'currencySelect',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<CurrencySelect>) => {
      state.coin = action.payload.coin;
      state.decimal = action.payload.decimal;
      state.id = action.payload.id;
    },
  },
});

export const { setCurrency } = currencySelectSlice.actions;
export default currencySelectSlice.reducer;