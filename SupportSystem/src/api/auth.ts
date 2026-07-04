import api from "./api"
import { LoginPayload, LoginResponse, RegisterPayload } from "../types/auth";

export const login = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/login", payload);
  return data;
};

export const register = async (
  payload: RegisterPayload
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/register", payload);
  return data;
};