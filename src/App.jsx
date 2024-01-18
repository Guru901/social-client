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
import More from "./Components/More";
const App = () => {
  const { login } = useContext(LoginContext);

  return (
    <BrowserRouter>
      <div className="w-screen min-h-[100svh] text-white py-4 relative">
        <Routes>
          {login ? (
            <>
              <Route path="/post" element={<Post />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post/:id" element={<More />} />
            </>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/login" />} />
              <Route path="/" element={<GetStarted />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </>
          )}

          {/* <Route path="/post" element={<Post />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post/:id" element={<More />} /> */}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
