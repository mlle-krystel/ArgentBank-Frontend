// src/features/profile/profile.slice.js

import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "./usecases/get-profile.usecase.js";

const initialState = {
  firstName: null,
  lastName: null,
  userName: null,
  email: null,
  error: null,
  loading: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action) {
      const { firstName, lastName, userName, email } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.userName = userName;
      state.email = email;
      state.error = null;
    },
    updateUserName(state, action) {
      state.userName = action.payload;
    },
    setProfileError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        const { firstName, lastName, userName, email } = action.payload;
        state.firstName = firstName;
        state.lastName = lastName;
        state.userName = userName;
        state.email = email;
        state.loading = false;
        state.error = null;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProfile, updateUserName, setProfileError } = profileSlice.actions;
export default profileSlice.reducer;
