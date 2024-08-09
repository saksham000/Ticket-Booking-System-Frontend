import { useState } from "react";
import {
  addNewShow,
  listAllShows,
  deleteShowService,
} from "../api/ManageShowService";

function ManageShows() {
  const [shows, setShows] = useState([]);
  const [movieIdShow, setMovieId] = useState("");
  const [showStart, setShowStartTime] = useState("");
  const [numberOfSeats, setNumberOfSeats] = useState(null);

  const fetchAllShows = async () => {
    await listAllShows().then((response) => {
      setShows(response.data);
    });
  };

  const addShow = async (e) => {
    e.preventDefault();
    await addNewShow(movieIdShow, showStart, numberOfSeats)
      .then((response) => {
        if (response.status === 200) {
          alert("Show Added Successfully !");
        } else {
          throw new Error("Please Check Details");
        }
      })
      .catch((Error) => {
        alert(Error);
      });
  };

  const deleteShow = async (showId) => {
    await deleteShowService(showId)
      .then((response) => {
        if (response.status === 200) {
          alert("Show Deleted Successfully !");
        } else {
          throw new Error("Please Check Details");
        }
        fetchAllShows();
      })
      .catch((Error) => {
        alert(Error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Shows</h1>
      <div className="mb-4">
        <form onSubmit={addShow} className="flex flex-col space-y-2">
          <input
            type="text"
            value={movieIdShow || ""}
            onChange={(e) => setMovieId(e.target.value)}
            placeholder="Movie ID"
            className="border p-2"
            required
          />
          <input
            type="text"
            value={showStart}
            onChange={(e) => setShowStartTime(e.target.value)}
            placeholder="Time in HH:MM:SS"
            className="border p-2"
            required
          />
          <input
            type="number"
            value={numberOfSeats || ""}
            onChange={(e) => setNumberOfSeats(e.target.value)}
            placeholder="Number of Seats"
            className="border p-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Add Show
          </button>
        </form>
      </div>
      <div>
        <button
          className="text-xl font-bold border border-black rounded hover:outline-none hover:ring-2 hover:ring-purple-500 p-4 m-5 mb-10 bg-green-400"
          onClick={fetchAllShows}
          type="submit"
        >
          Click Here to List Show
        </button>
        {shows.length === 0 ? (
          <p>No shows available</p>
        ) : (
          <div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200 w-full">
                <tr>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                    Show ID
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                    Movie ID
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                    Show Start Time
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                    Number Of Seats
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                    Delete Show
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {shows.map((shows) => (
                  <tr key={shows.showId} 
                  className="bg-white"
                  >
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {shows.showId}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {shows.movieIdShow}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {shows.showStart}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {shows.numberOfSeats}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <button
                        className="p-3 bg-red-500 rounded-full font-semibold text-black border border-black hover:outline-none hover:ring-2 hover:ring-purple-500"
                        onClick={() => deleteShow(shows.showId)}
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

export default ManageShows;
