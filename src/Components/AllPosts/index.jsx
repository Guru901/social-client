import React, { useEffect, useState, useContext } from "react";
import { LuArrowBigUpDash, LuArrowBigDownDash } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa";
import LoginContext from "../../context/LoginContext";

const All = () => {
  const [posts, setPosts] = useState([]);
  const [clickedPostBody, setClickedPostBody] = useState(""); // New state variable

  const { user } = useContext(LoginContext);

  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/allpost", {
          method: "GET",
        });

        const data = await response.json();
        setPosts(data.reverse());
      } catch (error) {
        console.log(error);
      }
    };

    getAllPosts();
  }, []);

  const postFind = async (_id) => {
    setClickedPostBody(_id);

    const post = await fetch("http://localhost:3000/api/posst", {
      method: "POST",
      body: JSON.stringify(_id),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await post.json();
    console.log(data);
  };

  return (
    <div className="px-5 flex flex-col gap-5 py-5">
      {posts.map((elem, index) => {
        return (
          <div
            className="border-[1px] rounded-2xl flex flex-col gap-5 text-wrap py-7"
            key={index}
            onClick={() => postFind(elem.body)}
          >
            <img
              src={elem.img}
              alt=""
              className="w-full max-h-[80%] object-cover"
            />
            <div className="flex items-center justify-between px-5">
              <div className="flex items-center gap-8">
                <div className="flex mb-8">
                  <LuArrowBigUpDash size={30} />
                  <LuArrowBigDownDash size={30} />
                </div>
                <div className="px-2 flex flex-col gap-2" onClick={postFind}>
                  <h1 className="text-xl">Author - Anonymouse</h1>
                  <h1 className="text-3xl font-bold">{elem.title}</h1>
                  <p className="text-2xl elem-body">{elem.body}</p>
                  <p className="text-2xl elem-body">{elem._id}</p>
                </div>
              </div>
              <div className="flex mb-8">
                <div className="bg-white p-2 rounded-full rotate-45 flex justify-center items-center">
                  <FaArrowUp color="black" size={20} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default All;
