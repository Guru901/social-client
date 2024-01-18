import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LoginContext from "../../context/LoginContext";

const More = () => {
  const { id } = useParams();
  const [res, setRes] = useState({});
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const [comment, setComment] = useState([]);

  const fetchComments = async () => {
    try {
      const comments = await fetch(`http://localhost:3000/api/comment/${id}`, {
        method: "GET",
      });
      const data = await comments.json();
      data.reverse();
      setComment(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/postcomment", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    setComment([...comment, data]);

    fetchComments();
    console.log(data);

    const input = document.getElementsByName("comment")[0];
    input.value = "";
  };

  useEffect(() => {
    const fetchData = async () => {
      const API = "http://localhost:3000/api";
      try {
        setLoading(true);
        const response = await fetch(`${API}/${id}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setRes("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
    fetchComments();
  }, [id]); // Include

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
      id,
    });
  };

  return (
    <div>
      <img
        src="/1.png"
        alt=""
        className="w-full h-full object-cover absolute top-0 z-[-1]"
      />
      {loading ? (
        "loading..."
      ) : (
        <div className="flex flex-col gap-5 p-8">
          <div className="flex flex-col gap-5">
            <h1 className="text-5xl">{res.title}</h1>
            <img
              src={res.img}
              alt=""
              className="w-[95vw] object-cover rounded-md"
            />
            <p className="text-4xl">{res.body}</p>
          </div>
          <div>
            <h1>Comment</h1>
            <form className="flex" onSubmit={handleSubmit}>
              <textarea
                type="text"
                placeholder="Comment....."
                className="otuline-none bg-zinc-800 px-8 text-2xl outline-none comment-input flex items-center justify-center pt-5 h-16 w-[73.5vw] max-w-[425px]"
                name="comment"
                onChange={handleChange}
              ></textarea>

              <input
                type="submit"
                value="Submit"
                className="bg-[#e65b0c] w-min p-3 px-6 text-[1.4rem] cursor-pointer comment-btn"
                onClick={() => fetchComments()}
              />
            </form>
          </div>
          <div className="flex flex-col gap-5 pb-28">
            {comment.map((elem, index) => (
              <div
                className="border-[1px] p-5 flex flex-col gap-5 rounded-xl"
                key={index}
              >
                <h1 className="text-3xl">User - Anonymouse</h1>
                <p className="text-2xl">{elem.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default More;
