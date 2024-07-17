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
                  {/* // jab bhi refresh kr rha hu site ko toh ye reset kr de rha
                  //hai sab kuch to  */}
                  <WelcomeComponent />
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
