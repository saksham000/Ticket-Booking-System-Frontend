import { useState } from "react";
import { createNewUserService } from "../api/User";
import { Link } from "react-router-dom";
function NewUser() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  const handleCreateUser = (e) => {
    e.preventDefault();

    createNewUserService(username)
      .then((response) => {
        if (response && response.data) {
          setUserId(response.data.userId);
          setError('');
        } else {
          throw new error("Invalid response from server");
        }
      })
      .catch((error) => {
        setError("Failed to create user");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Create New User</h1>

      <form onSubmit={handleCreateUser} className="w-full max-w-sm">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Create User
        </button>
      </form>

      {userId && (
        <div className="mt-4">
          <p className="text-green-500">
            User created successfully! Your User ID is: {userId}
          </p>
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

export default NewUser;
