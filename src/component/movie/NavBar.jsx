import { Link } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

export default function NavBar() {
  const authContext = useAuth();
  const isAuth = authContext.isAuth;
  function logout() {
    authContext.logout();
  }

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          Ticket Booking System
        </div>
        <div className="flex space-x-4">
          {isAuth && (
            <Link
              to={`welcome/${authContext.username}`}
              className="text-white hover:text-gray-300"
            >
              Home
            </Link>
          )}

          {isAuth && (
            <Link to="/movies" className="text-white hover:text-gray-300">
              Movies
            </Link>
          )}

          {!isAuth && (
            <Link to="/login" className="text-white hover:text-gray-300">
              login
            </Link>
          )}

          {isAuth && (
            <Link
              to="/logout"
              onClick={logout}
              className="text-white hover:text-gray-300"
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
