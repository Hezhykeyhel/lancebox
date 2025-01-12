import { configureStore } from '@reduxjs/toolkit';
import invoiceStoreReducer from './invoiceSlice';

const store = configureStore({
  reducer: {
    invoiceStore: invoiceStoreReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
