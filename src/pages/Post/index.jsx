import React from "react";
import UploadForm from "../../Components/Uploadform";

const Post = () => {
  return (
    <div>
      <img
        src="/1.png"
        alt=""
        className="w-full h-full object-cover absolute top-0 z-[-1]"
      />
      <div className="mt-16">
        <UploadForm />
      </div>
    </div>
  );
};

export default Post;
