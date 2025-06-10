// async thunk : Contient un thunk Redux censé gérer toute la logique de connexion utilisateur

// Import de la fonction qui fait l'appel réseau
import { loginUser } from "./auth.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Définition du type attendu pour les arguments du thunk
type LoginUtilisateur = {
  email: string;
  password: string;
};

// Définition du type retourné en cas de succès (le token)
type LoginResult = string;

// Code pour javaScript : export const login = createAsyncThunk(

// Thunk Redux Toolkit typé pour la connexion utilisateur : retourne une string (le token), et prend un objet LoginUtilisateur en argument
export const login = createAsyncThunk<LoginResult, LoginUtilisateur>(
  "auth/login", // nom de l'action, utilisé dans le slice
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // On appelle la fonction qui fait le fetch vers l'API
      const token = await loginUser(email, password);

      // Si tout se passe bien, on renvoie le token, il sera accessible dans action.payload dans le slice
      return token;

      // } catch (error) {
    } catch (error: any) {
      // Si une erreur survient (mauvais mot de passe, serveur, etc.), on transmet un message d’erreur explicite grâce à rejectWithValue
      return rejectWithValue(error.message || "Échec de connexion");
    }
  }
);
