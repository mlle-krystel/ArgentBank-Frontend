// Contient la fonction qui appelle l’API d’authentification de l’utilisateur.
const API_URL =
  (import.meta as any)?.env?.VITE_API_URL ||
  "http://localhost:3001/api/v1/user";

// Type personnalisé pour la réponse attendue de l’API login.
type LoginResponse = {
  message: string;
  body: {
    token: string;
  };
};

type ErrorResponse = {
  message?: string;
};

// Fonction asynchrone qui prend un email et un mot de passe et retourne un token d'authentification.
export async function loginUser(
  email: string,
  password: string
): Promise<string> {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    let data: LoginResponse | ErrorResponse | null = null;
    try {
      data = await response.json();
    } catch {
      // Corps non-JSON ou vide
      if (!response.ok) {
        throw new Error("Erreur serveur (réponse non-JSON)");
      }
    }

    if (!response.ok) {
      const message =
        (data && (data as ErrorResponse).message) ||
        "Erreur lors de la connexion";
      throw new Error(message);
    }

    return (data as LoginResponse).body.token;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    throw new Error(message);
  }
}
