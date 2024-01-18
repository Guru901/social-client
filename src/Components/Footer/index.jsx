import React from "react";
import { FaPlus, FaRegUser } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex justify-between justify-self-center h-24 bg-[#222222] fixed bottom-12 w-[90svw] max-w-[500px] items-center px-12 z-50 rounded-lg left-[4%]">
      <Link to="/feed">
        <MdHome size={24} />
      </Link>

      <MdHome size={24} />
      <Link to="/post">
        <div className="bg-[#e65b0c] w-[8rem] h-[5rem] rounded-full flex justify-center items-center bottom-2">
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
