import React from "react";
const StarRating = ({ className, rating, setRating }) => {
  const [hover, setHover] = React.useState(0);
  return (
    <div className={`${className}`}>
      <div
        className={`text-center flex flex-col sm:flex-row justify-center sm:items-center space-x-2 md:space-x-4 `}
      >
        <div className="w-fit">
          {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button
                type="button"
                key={index}
                className={`${
                  index <= (hover || rating)
                    ? " text-background_primary"
                    : " star-shadow text-[#f5e5e5] md:text-white"
                } cursor-auto`}
                onClick={() => setRating(index)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(rating)}
              >
                <span className={` text-3xl lg:text-4xl`}>&#9733;</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default StarRating;
