import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { AuthActionType } from "../types/authAction";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ type: AuthActionType.Login, payload: json });
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};
