import { apiClient } from "./ApiClient";

export const createNewUserService = (username) => {
  return apiClient.post(`/users`, { username });
};

export const findUserService = (userId) => {
  return apiClient.get(`/users/${userId}`);
};
