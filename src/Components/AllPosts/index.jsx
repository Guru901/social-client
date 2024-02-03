import React, { useEffect, useState, useContext } from "react";
import { LuArrowBigUpDash, LuArrowBigDownDash } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa";
import LoginContext from "../../context/LoginContext";
import { Link } from "react-router-dom";

const All = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({});
  const [likes, setLikes] = useState({});
  const [likedUser, setLikedUser] = useState([]);
  const [dislikes, setDisLikes] = useState({});
  const [loading, setLoading] = useState(false);

  const { setPost } = useContext(LoginContext);
  const { user } = useContext(LoginContext);

  const getAllPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://social-qxct.onrender.com/api/allpost",
        {
          method: "GET",
        }
      );

      const data = await response.json();
      setPosts(data.reverse());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const like = async (elem) => {
    setForm({
      ...form,
      user: user.user._id,
    });

    const response = await fetch(
      `https://social-qxct.onrender.com/api/like/${elem._id}`,
      {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    setLikes(data);
    getAllPosts();
  };

  const disLike = async (elem) => {
    setForm({
      ...form,
      user: user.user._id,
    });

    const response = await fetch(
      `https://social-qxct.onrender.com/api/disLike/${elem._id}`,
      {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setDisLikes(data);
    getAllPosts();
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  const handlePostClick = (elem) => {
    setPost(elem._id);
  };

  return (
    <div className="px-5 flex flex-col gap-5 py-5">
      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        posts.map((elem, index) => {
          const users = elem.userLiked;
          console.log(users);
          return (
            <div
              className="border-[1px] rounded-2xl flex flex-col gap-5 text-wrap pb-4 overflow-hidden"
              key={index}
              onClick={() => handlePostClick(elem)}
            >
              <img
                src={elem.image}
                alt=""
                className="w-full max-h-[80%] object-cover"
              />
              <div className="flex items-center justify-between px-5">
                <div className="flex items-center gap-8">
                  <div className="flex mb-8">
                    <div className="flex flex-col justify-center items-center">
                      <LuArrowBigUpDash size={30} onClick={() => like(elem)} />
                      <h1 className="text-2xl">{elem.likes}</h1>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <LuArrowBigDownDash
                        size={30}
                        onClick={() => disLike(elem)}
                      />
                      <h1 className="text-2xl">{elem.disLikes}</h1>
                    </div>
                  </div>
                  <div className="px-2 flex flex-col gap-2 overflow-hidden">
                    <div className="flex items-center justify-normal gap-2">
                      <h1 className="text-2xl">Author - {elem.username}</h1>{" "}
                      <Link to={`/profile/${elem.user}`}>
                        <div className="bg-white p-2 rounded-full flex justify-center items-center rotate-45">
                          <FaArrowUp color="black" size={12} />
                        </div>
                      </Link>
                    </div>
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
        })
      )}
    </div>
  );
};

export default All;
