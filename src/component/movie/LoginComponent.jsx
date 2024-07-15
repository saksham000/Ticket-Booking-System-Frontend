import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./security/AuthContext";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorMessage, SetShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  const authContext = useAuth();

  function handelUserName(event) {
    setUsername(event.target.value);
  }

  function handelPassword(event) {
    setPassword(event.target.value);
  }

  async function handelSubmit() {
    if (await authContext.login(username, password)) {
      navigate(`/welcome/${username}`);
    } else {
      SetShowErrorMessage(true);
    }
  }

  return (
    <div className="Login flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        {showErrorMessage && <div>Please Check Your Credientials</div>}

        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handelUserName}
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handelPassword}
              className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <button
              type="button"
              name="login"
              onClick={handelSubmit}
              className="w-full py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
