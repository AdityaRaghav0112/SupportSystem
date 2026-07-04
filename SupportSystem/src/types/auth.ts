export type UserRole = "user" | "management" | "it";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}