//  Thunk Redux Toolkit qui récupère le profil utilisateur avec le token

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../profile.api";

// Typage de la réponse attendue 
type UserProfil = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
};
// rejectValue pour typer la valeur de rejet en cas d’erreur
export const getProfile = createAsyncThunk<UserProfil, string, {rejectValue: string}>(
  "profile/getProfile",
  async (token, { rejectWithValue }) => {
    try {
      const profile = await getUserProfile(token);
      return profile;
    } catch (error) {
      // instanceof pour vérifier le type de l’erreur
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Erreur inconnue");
    }
  }
);
