import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const defaultBaseURL =
  Platform.OS === "web"
    ? "http://localhost:8000/api"
    : "http://10.0.2.2:8000/api";

const TOKEN_KEY = "token";

export async function getToken() {
  if (Platform.OS === "web") {
    return AsyncStorage.getItem(TOKEN_KEY);
  }

  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function setToken(token: string) {
  if (Platform.OS === "web") {
    return AsyncStorage.setItem(TOKEN_KEY, token);
  }

  return SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function removeToken() {
  if (Platform.OS === "web") {
    return AsyncStorage.removeItem(TOKEN_KEY);
  }

  return SecureStore.deleteItemAsync(TOKEN_KEY);
}

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? defaultBaseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { api };
export default api;