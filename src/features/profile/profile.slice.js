// Sert à gérer l’état du profil utilisateur dans Redux : c’est-à-dire enregistrer le nom, prénom, pseudo, etc., et pouvoir les modifier dans l’interface sans recharger toute la page.

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: null,
  lastName: null,
  userName: null,
  email: null,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    //  Enregistre toutes les infos du profil

    setProfile(state, action) {
      const { firstName, lastName, userName, email } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.userName = userName;
      state.email = email;
      state.error = null;
    },

    //   Met à jour uniquement le pseudo

    updateUserName(state, action) {
      state.userName = action.payload;
    },

    // Enregistre une erreur si besoin

    setProfileError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setProfile, updateUserName, setProfileError } =
  profileSlice.actions;
export default profileSlice.reducer;
