import { apiClient } from "./ApiClient";

export const findMoveByNameAndCity = (movieName, city) => {
  return apiClient.get(`/movies/${movieName}/${city}`);
};

export const findShowsOfMovieById = (movieId) => {
  return apiClient.get(`/shows/${movieId}`);
};

export const fetchSeatsOfShow = (showId) => {
  return apiClient.get(`/shows/seats/${showId}`);
};

export const bookSeatService = (userId, showId, seatNumber) => {
  return apiClient.get(`${userId}/shows/seats/${showId}/${seatNumber}`);
};
