export async function logoutUser(sessionToken: string): Promise<boolean> {
  try {
    const response = await fetch(
      `http://localhost:8080/api/auth/logout?sessionToken=${sessionToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}
