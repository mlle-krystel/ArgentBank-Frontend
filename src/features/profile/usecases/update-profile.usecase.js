// Fait le lien entre API et Redux (appel getUserProfile → dispatch Redux)

import {
  updateUserName as updateUserNameAPI,
  getUserProfile,
} from "../profile.api";
import { updateUserName, setProfile, setProfileError } from "../profile.slice";

// Thunk personnalisé pour mettre à jour le pseudo et recharger le profil
export const updateUserNameThunk = (token, newUserName) => async (dispatch) => {
  try {
    // 1. Mise à jour du pseudo via PUT
    await updateUserNameAPI(token, newUserName);

    // 2. Rechargement du profil complet (évite les duplications de données)
    const updatedProfile = await getUserProfile(token);

    // 3. Mise à jour du store Redux
    dispatch(setProfile(updatedProfile));
    dispatch(updateUserName(updatedProfile.userName));
  } catch (error) {
    console.error("Erreur mise à jour pseudo :", error.message);
    dispatch(setProfileError(error.message));
  }
};
