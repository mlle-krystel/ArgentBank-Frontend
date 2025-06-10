// Fait le lien entre API et Redux (appel getUserProfile → dispatch Redux)
import { createAsyncThunk } from "@reduxjs/toolkit";

import { updateUserName } from "../profile.api";
import { RootState } from "../../../store/store";

type UpdateProfilePayload = {
  // Le payload contient le nouveau nom d'utilisateur
  newUserName: string;
};

// Type du profil renvoyé
type UserProfile = {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
};

export const updateProfile = createAsyncThunk<
  UserProfile,
  UpdateProfilePayload,
  { rejectValue: string; state: RootState }
>(
  "profile/updateProfile",
  async ({ newUserName }, { rejectWithValue, getState }) => {
    const token = getState().auth.token;

    try {
      const data = await updateUserName(token!, newUserName);

      return data;
    } catch (error) {
      // Si une erreur survient, on utilise rejectWithValue pour renvoyer un message d'erreur
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue(
        "Erreur inconnue lors de la mise à jour du profil"
      );
    }
  }
);
