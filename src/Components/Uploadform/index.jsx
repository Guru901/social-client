import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UploadForm = () => {
  const [form, setFrom] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFrom({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://social-qxct.onrender.com/api/post",
        {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.state) {
        navigate("/feed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fileUpload = () => {
    const fileInput = document.getElementsByName("file")[0];
    fileInput.click();
  };

  return (
    <div>
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
          <input type="file" name="file" hidden />
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
    </div>
  );
};

export default UploadForm;
