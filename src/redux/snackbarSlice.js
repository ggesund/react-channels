import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showSnackbar: false,
  message: '',
  severity: 'success',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState: initialState,
  reducers: {
    show: (state, action) => {
      state.showSnackbar = true;
      // console.log(action);

      // the show action payload expects an object with two properties
      // message: message to display in snackbar
      // severity: type of message success|warning|error|info

      const possibleSeverities = ['error', 'warning', 'info', 'success'];

      // wenn keine gültige Severity, dann standardmäßig auf "success" setzen
      if (!possibleSeverities.includes(action.payload.severity)) {
        state.severity = 'success';
      } else {
        state.severity = action.payload.severity || 'success';
      }

      state.message = action.payload.message;
    },
    hide: (state) => {
      state.showSnackbar = false;
    },
  },
});

export const { show, hide } = snackbarSlice.actions;

export default snackbarSlice.reducer;
