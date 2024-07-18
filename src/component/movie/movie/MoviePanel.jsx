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
    findMoveByNameAndCity(movieName, city)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchShows = (movie) => {
    setSelectedMovie(movie);
    findShowsOfMovieById(parseInt(movie.id))
      .then((response) => {
        setShows(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchSeats = (show) => {
    setSelectedShow(show);
    setStoredShowId(show.showId);
    fetchSeatsOfShow(show.showId).then((response) => {
      setSeats(response.data);
    });
  };

  const bookSeat = (seat) => {
    bookSeatService(storedUserId, storedShowId, seat.seatNo)
      .then((response) => {
        alert("Seat is Booked Successfully !");
      })
      .catch((error) => {
        alert("Soory But Seat is Alredy Booked !!");
      });
  };

  return (
    <div className="bg-gray-100 w-full h-full">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-purple-700">Movie Panel</h1>

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
          <button type="submit" className="bg-blue-500 text-black p-2 rounded-lg">
            Search
          </button>
        </form>
        {/* movies list */}
        {movies.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2 text-purple-700 mt-7">Movies</h2>
            <ul>
              {movies.map((movie) => (
                <li
                  key={movie.id}
                  onClick={() => fetchShows(movie)}
                  className="cursor-pointer text-2xl border 
                border-red-500 p-5 m-7 rounded-full bg-blue-400 font-semibold"
                >
                  {movie.movieName} - {movie.city} - {movie.date}-{" "}
                  {movie.theatreName}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Show List */}
        {selectedMovie && shows.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-2 text-purple-700">
              Shows for {selectedMovie.movieName}
            </h2>
            <ul>
              {shows.map((show) => (
                <li
                  key={show.showId}
                  className="cursor-pointer text-2xl border 
                border-red-500 p-5 m-7 rounded-full bg-blue-400 font-semibold"
                  onClick={() => fetchSeats(show)}
                >
                  Show Start at: {show.showStart} - {show.showId}
                </li>
              ))}
            </ul>
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
                  className="p-4 cursor-pointer m-5 bg-green-600 rounded-full"
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
