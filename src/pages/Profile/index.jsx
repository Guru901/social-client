import React, { useContext } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import LoginContext from "../../context/LoginContext";

const Profile = () => {
  const { user } = useContext(LoginContext);

  return (
    <div>
      <div className="p-10 px-10 flex justify-between">
        <Link to="/">
          <IoIosArrowBack size={24} />
        </Link>
        <Link to="/">
          <button className="bg-[#e65b0c]  py-2 px-5 text-xl rounded-lg">
            Log out
          </button>
        </Link>
      </div>
      <div className="flex items-center gap-10 justify-start px-10">
        <div className="w-56 h-56 bg-sky-100 rounded-full"></div>
        <div>
          <h1 className="text-4xl mb-12">{user}</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
