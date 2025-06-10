

import { createSlice } from "@reduxjs/toolkit";
import { getProfile } from "./usecases/get-profile.usecase";
import { updateProfile } from "./usecases/update-profile.usecase";

type ProfileState = {
  firstName: string | null;
  lastName: string | null;
  userName: string | null;
  email: string | null;
  error: string | null;
  loading: boolean;
};

const initialState: ProfileState = {
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        // const { firstName, lastName, userName, email } = action.payload;
        // state.firstName = firstName;
        // state.lastName = lastName;
        // state.userName = userName;
        // state.email = email;
        // state.loading = false;
        // state.error = null;

        // Object.assign est une méthode qui permet de copier les valeurs de toutes les propriétés énumérables d'un ou plusieurs objets source vers un objet cible.
        Object.assign(state, action.payload);
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
        }
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.userName = action.payload.userName;
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = "Erreur lors de la mise à jour du pseudo";
        }
      });
  },
});

export default profileSlice.reducer;
