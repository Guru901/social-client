import React from "react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <div className="w-screen h-[100svh] text-white text-center flex justify-center overflow-clip">
      <img
        src="/1.png"
        alt=""
        className="w-full h-full object-cover absolute z-[1]"
      />
      <div className="w-full h-[100svh] max-w-[500px] flex flex-col justify-between py-16 overflow-clip z-[2]">
        <h1 className="text-6xl">Get Started</h1>
        <div className="flex flex-col gap-2">
          <p className="text-2xl text-red-600 px-8">Some text</p>
          <Link to="/signup">
            <button
              type="submit"
              value="Submit"
              className="bg-[#e65b0c] py-5 text-2xl rounded-md w-[85%]"
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
