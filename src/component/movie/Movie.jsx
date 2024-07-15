import ErrorComponent from "./ErrorComponent";
import LoginComponent from "./LoginComponent";
import WelcomeComponent from "./WelcomeComponent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider, { useAuth } from "./security/AuthContext";

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
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />

            <Route
              path="/welcome/:username"
              element={
                <AuthRoute>
                  {/* // jab bhi refresh kr rha hu site ko toh ye reset kr de rha
                  hai sab kuch to / */}
                  <WelcomeComponent />
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
