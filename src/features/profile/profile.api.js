// Contient les fonctions d’appel réseau (fetch vers /profile)
const API_URL = "http://localhost:3001/api/v1/user";

// Récupère le profil utilisateur

export async function getUserProfile(token) {
  const response = await fetch(`${API_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erreur profil");

  return data.body; // ex: { firstName, lastName, userName, ... }
}

/**
 * Met à jour le pseudo de l'utilisateur
 */
export async function updateUserName(token, newUserName) {
  const response = await fetch(`${API_URL}/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userName: newUserName }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erreur modification");

  return data.body;
}
