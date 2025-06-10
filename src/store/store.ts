// configureStore sert à créer le store Redux depiuis Redux Toolkit pour simplifier la configuration
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profile.slice";

// authReducer est le reducer pour la gestion de l'authentification

import authReducer from "../features/auth/auth.slice";

export const store = configureStore({
  // La clé reducer est un objet où on regroupe tous nos "slices"
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

// RootState est une fonction utilisé pour typer userSelector et useDispatch dans les composants React
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch est une fonction utilisé pour typer useDispatch dans les composants React
export type AppDispatch = typeof store.dispatch;
