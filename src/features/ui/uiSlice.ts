import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Role, Theme } from '../../types';

interface UIState {
  role: Role;
  theme: Theme;
}

const initialState: UIState = {
  role: 'admin',
  theme: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      // Side effect for global theme
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  },
});

export const { setRole, toggleTheme, setTheme } = uiSlice.actions;
export default uiSlice.reducer;
