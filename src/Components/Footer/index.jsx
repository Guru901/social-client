import React from "react";
import { FaPlus, FaRegUser } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex justify-between h-20 bg-[#111111] fixed bottom-0 w-screen max-w-[500px] items-center px-12">
      <Link to="/feed">
        <MdHome size={24} />
      </Link>

      <MdHome size={24} />
      <Link to="/post">
        <div className="bg-[#e65b0c] w-[5rem] h-[5rem] rounded-full flex justify-center items-center absolute bottom-6 translate-x-[-50%]">
          <FaPlus size={30} />
        </div>
      </Link>
      <FaRegUser size={24} />
      <Link to="/profile">
        <FaRegUser size={24} />
      </Link>
    </div>
  );
};

export default Footer;
