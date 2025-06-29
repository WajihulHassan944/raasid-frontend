// redux/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Read from localStorage if available (guarded for Next.js SSR)
let storedUser = null;
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('user');
  if (stored) storedUser = JSON.parse(stored);
}

const initialState = storedUser || {
  isLoggedIn: false,
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'user',
          JSON.stringify({ isLoggedIn: true, userData: action.payload })
        );
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
      }
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
