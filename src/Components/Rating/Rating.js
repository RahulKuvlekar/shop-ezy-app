import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, style, onClick }) => {
  return (
    <>
      {[...Array(5)].map((data, idx) => (
        <span
          key={idx}
          id={idx}
          style={style}
          onClick={(event) => onClick(idx, event)}
        >
          {rating > idx ? (
            <AiFillStar fontSize="1rem" />
          ) : (
            <AiOutlineStar fontSize="1rem" />
          )}
        </span>
      ))}
    </>
  );
};

export default Rating;
