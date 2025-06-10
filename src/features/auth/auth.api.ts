// Contient la fonction qui appelle l’API d’authentification de l’utilisateur.
const API_URL = "http://localhost:3001/api/v1/user";

// Type personnalisé pour la réponse attendue de l’API login et garantit que data.message et data.body.token sont bien présents.
type LoginResponse = {
  message: string;
  body: {
    token: string;
  };
};

// Version javascript : export async function loginUser(email, password) {

// Fonction asynchrone qui prend un email et un mot de passe et retourne un token d'authentification.
export async function loginUser(
  email: string,
  password: string
): // Promise<string> indique que cette fonction retourne une promesse de string, pour garantir que le token sera retourné une fois la connexion réussie.
Promise<string> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  

  // On vérifie que la réponse est au format JSON et on la transforme en objet.
  const data: LoginResponse = await response.json();

  // Si la réponse n'est pas OK, on lance une erreur.
  if (!response.ok) {
    throw new Error(data.message || "Erreur lors de la connexion");
  }

  // Retourne le token si la connexion a réussi.
  return data.body.token;
}
