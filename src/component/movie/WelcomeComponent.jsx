import { useParams, Link } from "react-router-dom";

export default function WelcomeComponent() {
  const { username } = useParams();

  return (
    <div className="bg-black min-h-screen">
      <div className=" text-gray-300">
        <h1 className="text-3xl text-center pt-20">Welcome {username} !</h1>
        <h2 className="text-3xl text-center pt-5">Please Choose One</h2>
        <div className="flex justify-center mt-24 gap-32">
          <Link to="/userpanel" className=" bg-red-500 text-center p-8 rounded">
            User
          </Link>
          <Link to="/adminpanel" className=" bg-green-500 text-center p-8 rounded">
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
