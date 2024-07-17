import { useState } from "react";
import { findUserService } from "../api/User";
import { Link } from "react-router-dom";


function OldUser() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handelUserCheck = (e) => {
    e.preventDefault();

    findUserService(userId)
      .then((response) => {
        if (response && response.data) {
          const { userId: responseUserId, username: responseUsername } =
            response.data; //Object Destructuring and Aliasing(assigening value to variables from Json object)
          if (
            responseUserId === parseInt(userId) && //praseint() converts string to int
            responseUsername === username
          ) {
            setMessage("User verified successfully!");
            setError("");
          } else {
            setError("User ID and Username does not matched");
            setMessage("");
          }
        } else {
          throw new error("Invalid Server Error");
        }
      })
      .catch((error) => {
        setError("Invalid User Id");
        setMessage("");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Verify Existing User</h1>
      <form onSubmit={handelUserCheck} className="w-full max-w-sm">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="userId"
          >
            User ID
          </label>
          <input
            id="userId"
            type="text"
            value={userId || ""}
            onChange={(e) => setUserId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Verify User
        </button>
      </form>
      {message && (
        <div className="mt-4">
          <p className="text-green-500">{message}</p>
          <Link className="bg-green-600 p-2 mt-4 block rounded-full" to="/movies">Click Here to Search Movie</Link>
        </div>
      )}
      {error && (
        <div className="mt-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}

export default OldUser;
