// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import userReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
  },
});

// 🔁 Save cart to localStorage on every state update
store.subscribe(() => {
  if (typeof window !== 'undefined') {
    const state = store.getState();
    localStorage.setItem('cartItems', JSON.stringify(state.cart.items));
  }
});

export default store;
