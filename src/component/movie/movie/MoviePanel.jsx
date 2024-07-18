import { useState } from "react";
import {
  bookSeatService,
  fetchSeatsOfShow,
  findMoveByNameAndCity,
  findShowsOfMovieById,
} from "../api/Movie";

function MoviePanel() {
  const [movieName, setmovieName] = useState("");
  const [city, setCity] = useState("");
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [storedShowId, setStoredShowId] = useState(null);
  const [storedUserId, setStoredUserId] = useState(null);

  const searchMovies = async (e) => {
    e.preventDefault();
    await findMoveByNameAndCity(movieName, city)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchShows = async (movie) => {
    setSelectedMovie(movie);
    await findShowsOfMovieById(parseInt(movie.id))
      .then((response) => {
        setShows(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchSeats = async (show) => {
    setSelectedShow(show);
    setStoredShowId(show.showId);
    await fetchSeatsOfShow(show.showId).then((response) => {
      setSeats(response.data);
    });
  };

  const bookSeat = async (seat) => {
    await bookSeatService(storedUserId, storedShowId, seat.seatNo)
      .then(() => {
        alert("Seat is Booked Successfully !");
      })
      .catch(() => {
        alert("Soory But Seat is Alredy Booked !!");
      });
  };

  return (
    <div className="bg-gray-100 w-full h-full">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold m-4 mb-7 text-purple-700">Movie Panel</h1>

        <form onSubmit={searchMovies} className="mb-4">
          <input
            type="text"
            value={storedUserId || ""}
            onChange={(e) => setStoredUserId(e.target.value)}
            placeholder="User Id"
            className="border p-2 mr-2 rounded-md"
            required
          />

          <input
            type="text"
            value={movieName}
            onChange={(e) => setmovieName(e.target.value)}
            placeholder="Movie Name"
            className="border p-2 mr-2 rounded-md"
            required
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="border p-2 mr-2 rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-black p-2 rounded-lg"
          >
            Search
          </button>
        </form>
        {/* movies list */}
        {movies.length > 0 && (
          <div>
            <h2 className="text-xl font-bold m-10 text-purple-700 mt-7">
              Movies
            </h2>
            <div>
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200 w-full">
                  <tr>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                      Movie Name
                    </th>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                      City
                    </th>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                      Date
                    </th>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                      Theater Name
                    </th>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                      Select Movie
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {movies.map((movie) => (
                    <tr key={movie.id} className="bg-white">
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {movie.movieName}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {movie.city}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {movie.date}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {movie.theatreName}
                      </td>

                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <button
                          className="p-3 bg-red-500 rounded-full font-semibold text-black border border-black hover:outline-none hover:ring-2 hover:ring-purple-500"
                          onClick={() => fetchShows(movie)}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* Show List */}
        {selectedMovie && shows.length > 0 && (
          <div>
            <h2 className="text-xl font-bold m-10 text-purple-700">
              Shows for {selectedMovie.movieName}
            </h2>

            <div>
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200 w-full">
                  <tr>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                      Show Starts At
                    </th>
                    <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                      Select Movie
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {shows.map((show) => (
                    <tr key={show.showId} className="bg-white">
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {show.showStart}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <button
                          className="p-3 bg-red-500 rounded-full font-semibold text-black border border-black hover:outline-none hover:ring-2 hover:ring-purple-500"
                          onClick={() => fetchSeats(show)}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>





          </div>
        )}
        {/* Seat List */}
        {selectedShow && seats.length > 0 && (
          <div>
            <h2 className="text-xl font-bold m-10 text-purple-700">
              Seats for Show {selectedShow.showId}
            </h2>
            <ul className="grid grid-cols-5 gap-1">
              {seats.map((seat) => (
                <li
                  key={seat.id}
                  className="p-4 cursor-pointer m-5 border-b-2 border-gray-200 bg-green-600 rounded-full"
                  onClick={() => bookSeat(seat)}
                >
                  Seat {seat.seatNo}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviePanel;
