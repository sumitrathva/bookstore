import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-400 to-teal-400 px-12 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-semibold text-white">BookHeaven</h2>
        <div className="flex flex-col md:flex-row">
          {links.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className="ms-4 text-white hover:text-gray-200 transition-colors duration-300"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
      <p className="text-center text-white">
        © 2024 BookHeaven. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
