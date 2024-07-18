import { apiClient } from "./ApiClient";

export const listAllUsersService = () => {
  return apiClient.get("/users");
};

export const deleteUserService = (userId) => {
  return apiClient.delete(`/users/${userId}`);
};
