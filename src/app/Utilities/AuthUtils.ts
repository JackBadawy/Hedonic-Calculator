export async function loginUser(
  username: string,
  password: string
): Promise<{ success: boolean; message: string; token?: string }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username,
          password,
        }),
      }
    );

    if (response.ok) {
      const token = await response.text();
      const cleanToken = token.replace(/^"|"$/g, "");
      return { success: true, message: "Login successful", token: cleanToken };
    } else {
      const errorText = await response.text();
      console.error("Login failed:", errorText);
      return { success: false, message: `Login failed: ${errorText}` };
    }
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: `Login error: ${error}` };
  }
}

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
