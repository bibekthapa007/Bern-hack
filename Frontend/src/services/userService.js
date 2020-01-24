import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/auth/register";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password
  });
}

export function logout() {
  localStorage.removeItem("token");
}

export default {
  register,
  logout
};
