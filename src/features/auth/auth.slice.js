// crée le slice Redux Toolkit qui gère l’état d’authentification global de l’application.

import { createSlice } from "@reduxjs/toolkit";
import { login } from "./auth.usecase";

const initialState = {
  token: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
       // Réinitialisation complète de l’état d’authentification
    logout(state) {
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
         // Quand l’appel est en cours : on affiche un chargement
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
         // Si succès : on stocke le token dans le state global
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        // Si échec : on récupère le message défini dans rejectWithValue
        state.error = action.payload || "Échec de la connexion";
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
