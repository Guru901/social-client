import React from "react";
import Loginform from "../../Components/Loginform";

const Login = () => {
  return (
    <div className="w-[100swv] h-[100svh] text-white text-center flex justify-center overflow-clip">
      <img
        src="/1.png"
        className="w-full h-full absolute object-cover z-[-1] top-0"
      />
      <div className="w-[100swv] h-[100svh] max-w-[500px] flex flex-col justify-between py-16 pb-28 overflow-clip z-[2]">
        <h1 className="text-6xl">Welcome Back</h1>
        <div className="w-screen text-start px-16">
          {/* <ul className="list-disc">
            <li className="opacity-70 text-[1.6rem]">
              We won't share your any details with anyone.
            </li>
            <li className="opacity-70 text-[1.6rem]">
              You can post anything but with limits.
            </li>
            <li className="opacity-70 text-[1.6rem]">
              There are some rules which if you register means you agree with
              them
            </li>
            <p className="opacity-70 text-[1.2rem] flex gap-1 items-center">
              Read rules and terms
              <Link
                href="#"
                className="opacity-70 text-[1.2rem] text-zinc-400 underline"
              >
                here
              </Link>
            </p>
          </ul> */}
        </div>
        <Loginform />
      </div>
    </div>
  );
};

export default Login;
