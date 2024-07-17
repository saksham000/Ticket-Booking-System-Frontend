import { Link } from "react-router-dom";

function UserPanle() {
  return (
    <div className="bg-black min-h-screen">
      <div className=" text-gray-300">
        <h1 className="text-3xl text-center pt-20">Welcome To User Panel !</h1>
        <h2 className="text-3xl text-center pt-5">Please Choose One</h2>
        <div className="flex justify-center mt-24 gap-32">
          <Link to="/newuser" className=" bg-red-500 text-center p-8 rounded">
            New User ?
          </Link>
          <Link to="/olduser" className=" bg-green-500 text-center p-8 rounded">
            Old User ?
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserPanle;
