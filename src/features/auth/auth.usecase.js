// TODO async thunk :  thunk, c’est une fonction qui permet de gèrer la connexion utilisateur

import { loginUser } from "./auth.api";
import { loginSuccess } from "./auth.slice";
import { getUserProfile } from "../profile/profile.api";
import { setProfile } from "../profile/profile.slice";

export const login = (email, password) => async (dispatch) => {
  try {
    // 1. On récupère le token avec l'email et le mdp
    const token = await loginUser(email, password);

    // 2. On récupère le profil de l’utilisateur avec le token
    const profileData = await getUserProfile(token);

    // 3. On met à jour le store Redux pour l’auth
    dispatch(loginSuccess({ token, user: profileData }));

    // 4. Et on met aussi le profil dans son slice dédié
    dispatch(setProfile(profileData));
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    // Tu peux aussi ajouter un dispatch d’erreur ici si tu veux
  }
};
