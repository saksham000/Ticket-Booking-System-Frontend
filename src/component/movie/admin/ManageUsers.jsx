import { useState } from "react";
import {
  deleteUserService,
  listAllUsersService,
} from "../api/ManageUserService";

function ManageUsers() {
  const [userss, setUser] = useState([]);

  const fetchAllUsers = async () => {
    listAllUsersService().then((response) => {
      setUser(response.data);
    });
  };

  const deleteUser = async (userId) => {
    deleteUserService(userId)
      .then((response) => {
        if (response.status === 200) {
          alert("User Deleted Successfully !!");
          fetchAllUsers();
        } else {
          alert("Something went wrong !!");
        }
      })
      .catch((Error) => {
        alert(Error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
      <div>
        <button
          className="text-xl font-bold border border-black rounded hover:outline-none hover:ring-2 hover:ring-purple-500 p-4 m-5 mb-10 bg-green-400"
          onClick={fetchAllUsers}
        >
          Click Here to List Users
        </button>
        {userss.length === 0 ? (
          <p>No users available</p>
        ) : (
          <div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200 w-full">
                <tr>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                    User ID
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                    User Name
                  </th>
                  <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">
                    Delete Show
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {userss.map((user) => (
                  <tr key={user.userId} className="bg-white">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.userId}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {user.username}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <button
                        className="p-3 bg-red-500 rounded-full font-semibold text-black border border-black hover:outline-none hover:ring-2 hover:ring-purple-500"
                        onClick={() => deleteUser(user.userId)}
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

export default ManageUsers;
