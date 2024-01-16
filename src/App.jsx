import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Footer from "./Components/Footer";
import GetStarted from "./Components/GetStarted";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import Post from "./pages/Post";
import Feed from "./pages/Feed";
import LoginContext from "./context/LoginContext";
import Profile from "./pages/Profile";
const App = () => {
  const { login } = useContext(LoginContext);

  return (
    <BrowserRouter>
      <div className="bg-zinc-900 w-screen min-h-[100svh] text-white py-4 relative">
        <Routes>
          {/* {login ? (
            <>
              <Route path="/post" element={<Post />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
            </>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/" element={<GetStarted />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )} */}

          <Route path="/post" element={<Post />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
