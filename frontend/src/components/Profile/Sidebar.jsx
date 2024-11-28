import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { authActions } from "../../store/auth";

const Sidebar = ({ ProfileData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(authActions.logout());
        dispatch(authActions.changeRole("user"));
        localStorage.clear(); // Clears all localStorage items
        navigate("/");
        Swal.fire("Logged Out!", "You have been logged out successfully.", "success");
      }
    });
  };

  return (
    <div className="h-auto lg:h-[100%] flex flex-col p-3 items-center justify-between bg-white">
      <div className="flex flex-col items-center w-full">
        <img src={ProfileData.avatar} alt="profile" className="h-[10vh]" />
        <p className="mt-3 text-xl text-gray-800 font-semibold">
          {ProfileData.username} ({role === "admin" ? "Admin" : "User"})
        </p>
        <p className="mt-1 text-normal text-gray-600">{ProfileData.email}</p>
        <div className="w-full mt-4 h-[1px] bg-gray-300 hidden lg:block"></div>
      </div>

      {role !== "admin" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className="text-gray-800 font-semibold w-full py-2 text-center hover:bg-gray-200 rounded transition-all duration-300"
          >
            {ProfileData.username}'s Favourites
          </Link>
          <Link
            to="/profile/order-history"
            className="text-gray-800 font-semibold w-full py-2 mt-4 text-center hover:bg-gray-200 rounded transition-all duration-300"
          >
            {ProfileData.username}'s Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-gray-800 font-semibold w-full py-2 mt-4 text-center hover:bg-gray-200 rounded transition-all duration-300"
          >
            {ProfileData.username}'s Settings
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="w-full flex-col items-center justify-center hidden lg:flex">
          <Link
            to="/profile"
            className="text-gray-800 font-semibold w-full py-2 text-center hover:bg-gray-200 rounded transition-all duration-300"
          >
            {ProfileData.username}'s All Orders
          </Link>
          <Link
            to="/profile/add-book"
            className="text-gray-800 font-semibold w-full py-2 mt-4 text-center hover:bg-gray-200 rounded transition-all duration-300"
          >
            Add Book (Admin)
          </Link>
        </div>
      )}

      <button
        className="bg-gray-200 w-3/6 lg:w-full mt-4 lg:mt-0 text-gray-800 font-semibold flex items-center justify-center py-2 rounded hover:bg-gray-300 transition-all duration-300"
        onClick={handleLogout}
      >
        Log Out <FaArrowRightFromBracket className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;
