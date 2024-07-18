import { apiClient } from "./ApiClient";

export const listAllShows = () => {
  return apiClient.get("/shows");
};

export const addNewShow = (movieIdShow, showStart, numberOfSeats) => {
  return apiClient.post("/shows", { movieIdShow, showStart, numberOfSeats });
};

export const deleteShowService = (showId) => {
  return apiClient.delete(`/shows/${showId}`);
};
