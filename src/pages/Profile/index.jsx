import React, { useContext, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import LoginContext from "../../context/LoginContext";
import { UserCircle } from "@phosphor-icons/react";
import { FaArrowUp } from "react-icons/fa";

const Profile = () => {
  const [post, setPost] = useState([]);
  const [id, setID] = useState();
  const [loading, setLoading] = useState(false);

  const { user } = useContext(LoginContext);

  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const postsID = user.user.posts;
      const ids = postsID.map((elem) => elem);
      setID(ids);
      const posts = await fetch(
        "https://social-qxct.onrender.com/api/userPost",
        {
          method: "POST",
          body: JSON.stringify(ids),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await posts.json();
      setPost(data.reverse());
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex w-screen h-screen justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <img
            src="/1.png"
            className="w-full h-full absolute object-cover z-[-1] top-0"
          />
          <div className="flex flex-col mx-5">
            <div className="p-10 px-10 flex justify-between z-10">
              <Link to="/">
                <IoIosArrowBack size={24} />
              </Link>
              <button
                className="bg-[#e65b0c]  py-2 px-5 text-xl rounded-lg"
                onClick={logout}
              >
                Log out
              </button>
            </div>
            <div className="flex items-center gap-10 justify-start px-5 border-b-[1px] pb-6 border-gray-500 z-10">
              <div className="w-56 h-56 rounded-full flex justify-center items-center overflow-hidden">
                {user.user.avatar.length > 0 ? (
                  <img
                    src={user.user.avatar}
                    alt={user.avatar}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserCircle size={200} weight="light" />
                )}
              </div>
              <div>
                <h1 className="text-4xl mb-12">
                  {user ? user.user.username : "Userame"}
                </h1>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-5 pb-20 z-10">
              <h1 className="text-4xl underline">Posts</h1>
              {post.map((elem, index) => (
                <div
                  className="border-[1px] rounded-2xl flex flex-col gap-5 text-wrap py-2"
                  key={index}
                >
                  <img
                    src={elem.image}
                    alt=""
                    className="w-full max-h-[80%] object-cover"
                  />
                  <div className="flex items-center justify-between px-5">
                    <div className="flex items-center gap-8">
                      <div className="px-2 flex flex-col gap-2">
                        <h1 className="text-xl">Author - Anonymouse</h1>
                        <h1 className="text-3xl font-bold">{elem.title}</h1>
                        <p className="text-2xl elem-body">{elem.body}</p>
                        <p className="text-2xl elem-body"></p>
                      </div>
                    </div>
                    <Link to={`/post/${elem._id}`} key={index}>
                      <div className="flex mb-8">
                        <div className="bg-white p-2 rounded-full rotate-45 flex justify-center items-center">
                          <FaArrowUp color="black" size={20} />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
