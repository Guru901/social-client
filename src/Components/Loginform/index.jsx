import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginContext from "../../context/LoginContext";

const Loginform = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setLogin } = useContext(LoginContext);
  const { setUser } = useContext(LoginContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);

      e.preventDefault();

      const data = await fetch("https://social-qxct.onrender.com/api/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await data.json();

      if (res.state) {
        setUser(res);
        setLogin(true);
        setLoading(false);
        navigate("/feed");
      } else {
        setError(res.msg);
        setLoading(false);
      }
    } catch (error) {}
  };

  return (
    <div>
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <div class="spinner"></div>
        </div>
      ) : (
        <form
          className="flex flex-col px-8 gap-5 pb-28"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter username....."
            className="p-5 text-3xl rounded-md outline-none bg-zinc-800"
            name="username"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="Enter password....."
            className="p-5 text-3xl rounded-md outline-none bg-zinc-800"
            name="password"
            onChange={handleChange}
          />
          {error && <p className="text-red-600 text-lg">{error}</p>}
          <div className="flex flex-col items-start">
            <div className="underline text-zinc-400 flex flex-col text-start">
              <Link to="/signup" className="text-[1.2rem]">
                Don't have an account?
              </Link>
            </div>
          </div>
          <input
            type="submit"
            value="Submit"
            className="bg-[#e65c0c] py-5 text-2xl rounded-md cursor-pointer"
          />
        </form>
      )}
    </div>
  );
};

export default Loginform;
