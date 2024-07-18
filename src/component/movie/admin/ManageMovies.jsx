import { useState } from "react";
import {
  addNewMovie,
  deleteMovieService,
  listAllMovies,
} from "../api/ManageMovieService";

function ManageMovies() {
  const [movies, setMovies] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [movieCity, setMovieCity] = useState("");
  const [movieDate, setMovieDate] = useState("");
  const [movieTheater, setMovieTheater] = useState("");

  const fetchAllMovies = async () => {
    await listAllMovies().then((response) => {
      setMovies(response.data);
    });
  };

  const addMovie = async (e) => {
    e.preventDefault();
    await addNewMovie(movieName, movieDate, movieCity, movieTheater)
      .then((response) => {
        if (response.status === 200) {
          alert("Movie Added Successfully !");
        } else {
          throw new Error("Error occured");
        }
      })
      .catch((Error) => {
        alert(Error);
      });
  };

  const deleteMovie = async (mId) => {
    await deleteMovieService(mId)
      .then((response) => {
        if (response.status === 200) {
          alert("Movie Deleted Successfully !!");
        } else {
          throw new Error("Error occured");
        }
      })
      .catch((Error) => {
        alert(Error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Movies</h1>
      <div className="mb-4">
        <form onSubmit={addMovie} className="flex flex-col space-y-2">
          <input
            type="text"
            value={movieName}
            onChange={(e) => setMovieName(e.target.value)}
            placeholder="Movie Name"
            className="border p-2"
            required
          />
          <input
            type="text"
            value={movieCity}
            onChange={(e) => setMovieCity(e.target.value)}
            placeholder="City"
            className="border p-2"
            required
          />

          <input
            type="text"
            value={movieDate}
            onChange={(e) => setMovieDate(e.target.value)}
            placeholder="Date in yyy-mm-dd"
            className="border p-2"
            required
          />

          <input
            type="text"
            value={movieTheater}
            onChange={(e) => setMovieTheater(e.target.value)}
            placeholder="Theater Name"
            className="border p-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Movie
          </button>
        </form>
      </div>
      <div>
        <button
          type="submit"
          onClick={fetchAllMovies}
          className="text-xl font-bold border border-black rounded hover:outline-none hover:ring-2 hover:ring-purple-500 p-4 m-5 mb-10 bg-green-400"
        >
          Click Here to List Movie
        </button>
        {movies.length === 0 ? (
          <p>No movies available</p>
        ) : (
          <div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                    Movie ID
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                    Movie Name
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                    Movie Date
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                    Movie City
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                    Theater Name
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                    Delete Movie
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {movies.map((movie) => (
                  <tr key={movie.id} className="bg-white">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {movie.id}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {movie.movieName}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {movie.date}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {movie.city}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {movie.theatreName}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <button
                        className="p-3 bg-red-500 rounded-full font-semibold text-black border border-black hover:outline-none hover:ring-2 hover:ring-purple-500"
                        onClick={() => deleteMovie(movie.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageMovies;
