import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // This imports local storage as the storage mechanism
import cartReducer from './slices/cartSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    cart: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };

