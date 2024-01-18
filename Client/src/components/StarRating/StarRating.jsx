import React from "react";
import Heading from "../Text/Heading";
const StarRating = ({ className, rating,review }) => {

  return (
    <div className={`${className}`}>
      <div
        className={`text-center flex flex-col sm:flex-row justify-center items-center space-x-4 md:space-x-6 `}
      >
        <Heading className=" lg:text-[6rem] ">{rating}</Heading>
        <div className=" space-x-2 lg:space-x-3 xl:space-x-4">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={`${
                  index <= rating
                    ? " text-background_primary"
                    : " star-shadow text-white"
                } cursor-auto`}
                // onClick={() => setRating(index)}
                // onMouseEnter={() => setHover(index)}
                // onMouseLeave={() => setHover(rating)}
              >
                <span className={` text-5xl lg:text-5xl`}>&#9733;</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className=" text-center font-secondary_font text-base md:text-lg lg:text-xl text-primary">
        
        {review === 0 ? "No Reviews Yet" : review +" Reviews"} 
      </div>
    </div>
  );
};
export default StarRating;
