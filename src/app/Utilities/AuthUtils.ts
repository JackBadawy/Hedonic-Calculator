export async function logoutUser(sessionToken: string): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout?sessionToken=${sessionToken}`,
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
