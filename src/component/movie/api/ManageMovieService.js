import { apiClient } from "./ApiClient";

export const listAllMovies = ()=>{
    return apiClient.get(`/movies`)
}

export const  addNewMovie = (movieName,date,city,theatreName)=>{
    return apiClient.post(`/movies`,{movieName,date,city,theatreName})
}

export const deleteMovieService = (mId) =>{
    return apiClient.delete(`/movies/${mId}`)
}