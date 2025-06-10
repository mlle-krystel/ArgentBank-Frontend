// Centralise les appels API liés au profil utilisateur

const API_URL = "http://localhost:3001/api/v1/user";

// Définition d’un type strict pour la structure de la réponse API
type ProfileResponse = {
  message: string;
  body: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    createdAt: string;
    updatedAt: string;
  };
};

export async function getUserProfile(
  token: string
): Promise<ProfileResponse["body"]> {
  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data: ProfileResponse = await response.json();
  if (!response.ok) throw new Error(data.message || "Erreur profil");

  return data.body; // ex: { firstName, lastName, userName, ... }
}

// Mise à jour du pseudo utilisateur : nécessite token + nouveau nom
export async function updateUserName(
  token: string,
  newUserName: string
): Promise<ProfileResponse["body"]> {
  const response = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userName: newUserName }),
  });

  // const data = await response.json();

  const data: ProfileResponse = await response.json();
  if (!response.ok) throw new Error(data.message || "Erreur modification");

  return data.body;
}
