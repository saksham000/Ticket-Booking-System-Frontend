import { Link } from "react-router-dom";

function AdminPanel() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 mt-5">Admin Panel</h1>
      <div className="flex flex-col space-y-4 gap-5 mt-10">
        <Link to="/managemovies" className="bg-blue-500 text-white p-4 rounded">
          Manage Movies
        </Link>
        <Link to="/manageshows" className="bg-green-500 text-white p-4 rounded">
          Manage Shows
        </Link>
        <Link to="/manageusers" className="bg-red-500 text-white p-4 rounded">
          Manage Users
        </Link>
      </div>
    </div>
  );
}

export default AdminPanel;
