//  Thunk Redux Toolkit qui récupère le profil utilisateur avec le token

import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserProfile } from "../profile.api";

type UserProfil = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
};

export const getProfile = createAsyncThunk<UserProfil, string>(
  "profile/getProfile",
  async (token, { rejectWithValue }) => {
    try {
      const profile = await getUserProfile(token);
      return profile;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Erreur inconnue");
    }
  }
);
