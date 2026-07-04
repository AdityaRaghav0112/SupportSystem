import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "token";

async function getNativeToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

async function setNativeToken(token: string) {
  return SecureStore.setItemAsync(TOKEN_KEY, token);
}

async function deleteNativeToken() {
  return SecureStore.deleteItemAsync(TOKEN_KEY);
}

export async function getToken() {
  if (Platform.OS === "web") {
    return AsyncStorage.getItem(TOKEN_KEY);
  }

  return getNativeToken();
}

export async function setToken(token: string) {
  if (Platform.OS === "web") {
    return AsyncStorage.setItem(TOKEN_KEY, token);
  }

  return setNativeToken(token);
}

export async function removeToken() {
  if (Platform.OS === "web") {
    return AsyncStorage.removeItem(TOKEN_KEY);
  }

  return deleteNativeToken();
}