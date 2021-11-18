import React from "react";

const ImageLoader = (props) => {
  return (
    <img
      src="/Images/loading.gif"
      alt="loading..."
      style={{
        position: `${props.position ? props.position : "absolute"}`,
        zIndex: "999",
        top: "45%",
        left: "45%",
        width: "4.5rem",
        height: "4.5rem",
      }}
    />
  );
};

export default ImageLoader;
