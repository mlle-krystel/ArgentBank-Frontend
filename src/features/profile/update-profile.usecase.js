//Fait le lien entre API et Redux (appel getUserProfile → dispatch Redux)

import {
  updateUserName as updateUserNameAPI,
  getUserProfile,
} from "./profile.api";
import { updateUserName, setProfile, setProfileError } from "./profile.slice";

//  Thunk pour mettre à jour le pseudo et synchroniser le profil

export const updateUserNameThunk = (token, newUserName) => async (dispatch) => {
  try {
    // 1. Appel PUT API
    await updateUserNameAPI(token, newUserName);

    // 2. On recharge le profil complet
    const updatedProfile = await getUserProfile(token);

    // 3. Mise à jour du store Redux
    dispatch(setProfile(updatedProfile));
    dispatch(updateUserName(updatedProfile.userName));
  } catch (error) {
    console.error("Erreur mise à jour pseudo :", error.message);
    dispatch(setProfileError(error.message));
  }
};
