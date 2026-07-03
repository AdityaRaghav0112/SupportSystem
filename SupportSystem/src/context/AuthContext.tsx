import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";

import { login } from "../api/auth";
import { api } from "../api/api";
import { User } from "../types/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;

  loginUser: (email: string, password: string) => Promise<void>;
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
      const token = await SecureStore.getItemAsync("token");

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
      await SecureStore.deleteItemAsync("token");
    } finally {
      setLoading(false);
    }
  }

  async function loginUser(email: string, password: string) {
    const response = await login({
      email,
      password,
    });

    await SecureStore.setItemAsync(
      "token",
      response.token
    );

    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${response.token}`;

    setUser(response.user);
  }

  async function logout() {
    await SecureStore.deleteItemAsync("token");

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