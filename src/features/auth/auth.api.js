// TODO fetch

const API_URL = "http://localhost:3001/api/v1/user";

/**
 * Appelle l'API pour se connecter avec email et mot de passe
 */
export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erreur login");

  return data.body.token; // On renvoie uniquement le token
}
