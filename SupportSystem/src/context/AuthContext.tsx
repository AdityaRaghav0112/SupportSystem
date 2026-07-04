import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { login, register } from "../api/auth";
import api, { getToken, removeToken, setToken } from "../api/api";
import { User } from "../types/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  loginUser: (email: string, password: string) => Promise<User>;
  registerUser: (
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();
  }, []);

  async function initializeAuth() {
    try {
      const token = await getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      const { data } = await api.get("/me");

      setUser(data.user);
    } catch (error) {
      await removeToken();
    } finally {
      setLoading(false);
    }
  }

  async function loginUser(email: string, password: string) {
    const response = await login({
      email,
      password,
    });

    await setToken(response.token);

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.token}`;

    setUser(response.user);

    return response.user;
  }

  async function registerUser(
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string
  ) {
    const response = await register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });

    await setToken(response.token);

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.token}`;

    setUser(response.user);

    return response.user;
  }

  async function logout() {
    await removeToken();

    delete api.defaults.headers.common.Authorization;

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}