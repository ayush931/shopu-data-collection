export const login = async (email: string, password: string) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      message: "Login failed",
    };
  }
  
  localStorage.setItem("token", data.token);

  return {
    success: true,
    message: 'Login successfull'
  }
};

export const logout = async () => {
  const response = await fetch("/api/auth/logout", {
    method: "GET",
    credentials: "include",
  }).catch((error) => {
    console.log(error);
  });

  if (!response) {
    return {
      success: false,
      message: "Logout failed",
    };
  }

  localStorage.removeItem("token");

  return {
    success: true,
    message: 'Logout successfull'
  }
};
