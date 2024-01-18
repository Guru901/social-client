import React from "react";
import All from "../../Components/AllPosts";

const Feed = () => {
  return (
    <div>
      <img
        src="/1.png"
        className="w-full h-full absolute object-cover z-[-1] top-0"
      />
      <div className="z-10">
        <All />
      </div>
    </div>
  );
};

export default Feed;
