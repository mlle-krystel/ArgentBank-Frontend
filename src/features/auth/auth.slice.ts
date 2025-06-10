// crée le slice Redux Toolkit qui gère l’état d’authentification global de l’application.

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login } from "./auth.usecase";

// Définition du type de l’état d’authentification
type AuthState = {
  token: string | null;
  error: string | null;
  loading: boolean;
};

// Initialisation de l’état avec des types explicites
const initialState: AuthState = {
  token: null,
  error: null,
  loading: false,
};

// Création du slice Redux typé
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // PlayloadAction est utilisé pour typer l'action retournée par le thunk qui contient le token
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        // Pour éviter les erreurs de typage, on utilise "as string" pour indiquer que payload est une chaîne de caractères
        state.error = (action.payload as string) || "Échec de la connexion";
        state.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
