import { api } from "./api";
import { LoginPayload, LoginResponse } from "../types/auth";

export const login = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>("/login", payload);
  return data;
};