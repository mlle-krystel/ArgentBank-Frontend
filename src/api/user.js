const API_URL = "http://localhost:3001/api/v1/user";

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erreur login");
  return data.body.token;
}

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

  // API renvoie un objet : { firstName, lastName, email, userName, ... }
  return data.body;
}
