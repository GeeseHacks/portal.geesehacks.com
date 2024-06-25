export async function signIn(provider: string, username: string, password: string) {
  console.log("FINALLY");
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    body: JSON.stringify({username, password}), 
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Authentication failed");
  }
  // Handle successful sign-in
  const data = await response.json();
  console.log(data);

  return data;
}
