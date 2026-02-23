import { api } from "./axios";

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  role?: string
}


export interface LoginResponse {
  token: string
  user: AuthUser
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

// Login user
export const login = (data: LoginPayload) =>
  api.post<LoginResponse>("/login", data)

//  Logout user
export const logout = () => {
  localStorage.removeItem("token")
}

// Register user
export const register = (data: RegisterPayload) =>
  api.post("/signup", data)
