import React, { useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../../context/LoginContext";

const UploadForm = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const { user } = useContext(LoginContext);

  const fileRef = useRef();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      userId: user.user._id,
    });
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      file: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("body", form.body);
      formData.append("userId", form.userId);
      formData.append("file", form.file);

      const response = await fetch(
        "https://social-qxct.onrender.com/api/post",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.state) {
        setLoading(false);
        navigate("/feed");
      }
      if (!data.state) {
        setLoading(false);
        console.log(data.msg);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fileUpload = () => {
    const fileInput = document.getElementsByName("file")[0];
    fileInput.click();
  };

  return (
    <div>
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <form className="flex flex-col px-8 gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title...."
            className="p-5 text-3xl rounded-md outline-none bg-zinc-800"
            name="title"
            onChange={handleChange}
          />
          <textarea
            name="body"
            cols="30"
            rows="10"
            placeholder="Text.."
            className=" p-5 text-3xl rounded-md outline-none bg-zinc-800"
            onChange={handleChange}
          ></textarea>

          <div className="flex items-center justify-start">
            <input type="file" name="file" hidden onChange={handleFileChange} />
            <p
              className="text-xl text-blue-500 mr-5 cursor-pointer"
              onClick={fileUpload}
            >
              Upload Files (images aur videos)
            </p>
            <span>Optional</span>
          </div>
          <div className="flex gap-4">
            <input
              type="submit"
              value="Post"
              className="bg-[#e65b0c] w-min p-3 px-16 text-[1.4rem] rounded-lg cursor-pointer"
            />
            <Link to="/feed">
              <input
                type="submit"
                value="Go Back"
                className="bg-zinc-800 border-2 border-zinc-400 w-min p-3 px-[2.3rem] text-[1.4rem] rounded-lg cursor-pointer"
              />
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default UploadForm;
