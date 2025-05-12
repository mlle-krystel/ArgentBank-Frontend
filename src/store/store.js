// configureStore sert à créer le store Redux depiuis Redux Toolkit pour simplifier la configuration
import { configureStore } from '@reduxjs/toolkit';

// authReducer est le reducer pour la gestion de l'authentification
// authSlice est un fichier qui contient la logique de l'authentification
import authReducer from '../features/authSlice';

export const store = configureStore({
    // La clé reducer est un objet où on regroupe tous nos "slices"
  reducer: {
    auth: authReducer,
  },
});
