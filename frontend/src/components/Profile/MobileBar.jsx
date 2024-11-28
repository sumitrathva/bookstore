import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileBar = ({ username }) => {
  const role = useSelector((state) => state.auth.role);

  return (
    <div className="w-full items-center justify-center flex lg:hidden flex-col bg-gray-100">
      <p className="text-xl text-gray-800 font-semibold mb-4">
        {username} ({role === "admin" ? "Admin" : "User"})
      </p>

      {role !== "admin" ? (
        <>
          <Link
            to="/profile"
            className="text-gray-800 font-semibold w-full py-2 text-center hover:bg-gray-300 rounded transition-all duration-300"
          >
            {username}'s Favourites
          </Link>
          <Link
            to="/profile/order-history"  /* Updated path here for consistency */
            className="text-gray-800 font-semibold w-full py-2 mt-2 text-center hover:bg-gray-300 rounded transition-all duration-300"
          >
            {username}'s Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-gray-800 font-semibold w-full py-2 mt-2 text-center hover:bg-gray-300 rounded transition-all duration-300"
          >
            {username}'s Settings
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/profile"
            className="text-gray-800 font-semibold w-full py-2 text-center hover:bg-gray-300 rounded transition-all duration-300"
          >
            {username}'s All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className="text-gray-800 font-semibold w-full py-2 mt-2 text-center hover:bg-gray-300 rounded transition-all duration-300"
          >
            Add Book (Admin)
          </Link>
        </>
      )}
    </div>
  );
};

export default MobileBar;
