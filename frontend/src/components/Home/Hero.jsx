import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-teal-400 to-blue-500 h-auto lg:h-[89vh] w-full flex flex-col lg:flex-row px-10 py-8 lg:py-0">
      <div className="w-full lg:w-3/6 h-[100%] flex items-center justify-center">
        <div className="w-full">
          <h1 className="text-white text-6xl font-bold text-center lg:text-left drop-shadow-lg">
            Discover Your Next Great Read
          </h1>
          <p className="text-2xl text-white mt-5 text-center lg:text-left drop-shadow-lg">
            Uncover captivating stories, enriching knowledge, and endless
            inspiration in our curated collection of books
          </p>
          <div className="flex justify-center lg:justify-start">
            <Link
              to="/all-books"
              className="my-5 lg:my-8 text-3xl bg-white rounded-full py-3 px-8 flex items-center justify-center text-teal-500 font-semibold border border-white hover:bg-teal-100 transition-all duration-300 shadow-lg"
            >
              Discover Books
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
        <img
          src="/hero.png"
          alt="hero"
          className="h-auto lg:h-[100%] object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
