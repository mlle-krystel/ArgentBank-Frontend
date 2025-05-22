// configureStore sert à créer le store Redux depiuis Redux Toolkit pour simplifier la configuration
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/profile.slice";

// authReducer est le reducer pour la gestion de l'authentification

import authReducer from "../features/auth/auth.slice.js";

export const store = configureStore({
  // La clé reducer est un objet où on regroupe tous nos "slices"
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});
