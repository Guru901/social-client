import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import LoginContext from "../../context/LoginContext";

const SignUp = () => {
  const [form, setForm] = useState({});
  const [pswd, setPswd] = useState("");
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

  const handleFileChange = (e) => {
    setForm({
      ...form,
      file: e.target.files[0],
    });
  };

  const pswdCheck = () => {
    if (form.password.length < 6) {
      setError("Password must be atleast 6 characters");
      return false;
    }

    if (pswd !== form.password) {
      setError("Passwords don't match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);

      e.preventDefault();

      if (pswdCheck()) {
        const formData = new FormData();
        formData.append("username", form.username);
        formData.append("password", form.password);
        formData.append("file", form.file);
        const data = await fetch(
          "https://social-qxct.onrender.com/api/register",
          {
            method: "POST",
            body: formData,
          }
        );

        const res = await data.json();
        if (res.state) {
          setUser(res);
          setLoading(false);
          setLogin(true);
          navigate("/feed");
        }
        if (!res.state) {
          setLoading(false);
          setLogin(false);
          setError("Username taken choose another");
        }
      }
    } catch (error) {
      console.log(error);
      setError("Some error occurred try again");
    }
  };

  const fileUpload = () => {
    document.getElementsByName("file")[0].click();
  };

  return (
    <div>
      {loading ? (
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <form
          className="flex flex-col px-8 gap-5"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <input
            type="text"
            placeholder="Enter username....."
            className="p-5 text-3xl rounded-md outline-none bg-zinc-800"
            onChange={handleChange}
            name="username"
          />

          <input
            type="password"
            placeholder="Enter password....."
            className="p-5 text-3xl rounded-md outline-none bg-zinc-800"
            onChange={handleChange}
            name="password"
          />
          <input
            type="password"
            placeholder="Confirm password....."
            className="p-5 text-3xl rounded-md outline-none bg-zinc-800"
            onChange={(e) => setPswd(e.target.value)}
          />
          <input type="file" name="file" hidden onChange={handleFileChange} />
          <p
            className="text-xl text-blue-500 mr-5 cursor-pointer text-start"
            onClick={fileUpload}
          >
            Avatar
          </p>
          <p className="text-red-600 text-lg">{error}</p>
          <div className="flex flex-col items-start">
            <p className="text-xl">
              Remember you can't ever change the password
            </p>
            <div className="underline text-zinc-400 flex flex-col text-start">
              <Link to="#" className="text-[1.2rem]">
                Learn more
              </Link>
              <Link to="/login" className="text-[1.2rem]">
                Already have an account?
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

export default SignUp;
