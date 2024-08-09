import ErrorComponent from "./ErrorComponent";
import LoginComponent from "./LoginComponent";
import WelcomeComponent from "./WelcomeComponent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { useAuth } from "./security/AuthContext";
import NavBar from "./NavBar";
import Logout from "./Logout";
import UserPanle from "./user/UserPanel";
import NewUser from "./user/NewUser";
import OldUser from "./user/OldUser";
import MoviePanel from "./movie/MoviePanel";
import AdminPanel from "./admin/AdminPanel";
import ManageUsers from "./admin/ManageUsers";
import ManageShows from "./admin/ManageShows";
import ManageMovies from "./admin/ManageMovies";

  function AuthRoute({ children }) {
    const authContext = useAuth();

    if (authContext.isAuth) return children;

    return <Navigate to="/" />;
  }

export default function Movie() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />

            <Route
              path="/welcome/:username"
              element={
                <AuthRoute>
                  {/* jab bhi refresh kr rha hu site ko toh ye reset kr de rha
                  hai sab kuch to / */}
                  <WelcomeComponent />
                </AuthRoute>
              }
            />

            <Route
              path="/adminpanel"
              element={
                <AuthRoute>
                  <AdminPanel />
                </AuthRoute>
              }
            />

            <Route
              path="/managemovies"
              element={
                <AuthRoute>
                  <ManageMovies />
                </AuthRoute>
              }
            />

            <Route
              path="/manageshows"
              element={
                <AuthRoute>
                  <ManageShows />
                </AuthRoute>
              }
            />

            <Route
              path="/manageusers"
              element={
                <AuthRoute>
                  <ManageUsers />
                </AuthRoute>
              }
            />

            <Route
              path="/userpanel"
              element={
                <AuthRoute>
                  <UserPanle />
                </AuthRoute>
              }
            />

            <Route
              path="/newuser"
              element={
                <AuthRoute>
                  <NewUser />
                </AuthRoute>
              }
            />

            <Route
              path="/olduser"
              element={
                <AuthRoute>
                  <OldUser />
                </AuthRoute>
              }
            />

            <Route
              path="/movies"
              element={
                <AuthRoute>
                  <MoviePanel />
                </AuthRoute>
              }
            />

            <Route
              path="/logout"
              element={
                <AuthRoute>
                  <Logout />
                </AuthRoute>
              }
            />

            <Route path="*" element={<ErrorComponent />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
