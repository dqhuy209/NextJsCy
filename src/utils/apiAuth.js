import { GET, POST } from "@/service/authService";

export const login = async (email, password) => {
  return await POST("/login", { email, password });
};
export const register = async (name, email, password) => {
  return await POST("/signup", { name, email, password });
};
export const logout = async () => {
  return await POST("/logout");
};
export const userProfile = async () => {
  return await GET("/user");
};
