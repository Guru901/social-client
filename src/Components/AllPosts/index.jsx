import React, { useEffect, useState, useContext } from "react";
import { LuArrowBigUpDash, LuArrowBigDownDash } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa";
import LoginContext from "../../context/LoginContext";
import { Link } from "react-router-dom";

const All = () => {
  const [posts, setPosts] = useState([]);

  const { setPost } = useContext(LoginContext);

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

  const handlePostClick = (elem) => {
    setPost(elem._id);
  };

  return (
    <div className="px-5 flex flex-col gap-5 py-5">
      {posts.map((elem, index) => {
        return (
          <div
            className="border-[1px] rounded-2xl flex flex-col gap-5 text-wrap pb-4 overflow-hidden"
            key={index}
            onClick={() => handlePostClick(elem)}
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
                <div className="px-2 flex flex-col gap-2 overflow-hidden">
                  <h1 className="text-xl">Author - Anonymouse</h1>
                  <h1 className="text-3xl font-bold">{elem.title}</h1>
                  <p className="text-2xl elem-body max-w-[60vw] overflow-hidden text-ellipsis whitespace-nowrap">
                    {elem.body}
                  </p>
                </div>
              </div>
              <Link to={`/post/${elem._id}`} key={index}>
                <div className="flex mb-5">
                  <div className="bg-white p-2 rounded-full rotate-45 flex justify-center items-center">
                    <FaArrowUp color="black" size={20} />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default All;
