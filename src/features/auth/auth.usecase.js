// async thunk : Contient un thunk Redux censé gérer toute la logique de connexion utilisateur


// Import de la fonction qui fait l'appel réseau
import { loginUser } from "./auth.api"; 
import { createAsyncThunk } from "@reduxjs/toolkit";

// Thunk Redux pour la connexion utilisateur
export const login = createAsyncThunk(
  "auth/login", // nom de l'action, utilisé dans le slice
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // On appelle la fonction qui fait le fetch vers l'API
      const token = await loginUser(email, password);
      

      // Si tout se passe bien, on renvoie le token, il sera accessible dans action.payload dans le slice
      return token;
    } catch (error) {
      // Si une erreur survient (mauvais mot de passe, serveur, etc.), on transmet un message d’erreur explicite grâce à rejectWithValue
      return rejectWithValue(error.message || "Échec de connexion");
    }
  }
);

