import { Link } from "react-router-dom";

export default function Logout() {
  return (
    <div className="text-green-600 mt-40 font-semibold text-4xl">
      <h1>You are Logged Out !</h1>
      <div>Thank You For using My App.</div>
      <br />
      <div>Want to Login ?</div>
      <Link to="/login" className="text-red-600">
        Login
      </Link>
    </div>
  );
}
