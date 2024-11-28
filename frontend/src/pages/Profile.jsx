import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Profile/Sidebar";
import Loader from "./Loader";
import MobileBar from "../components/Profile/MobileBar";

const Profile = () => {
  const [ProfileData, setProfileData] = useState(null); // Set initial state to null
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate(); // Use navigate instead of history
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/"); // Redirect to home if not logged in
    } else {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:1000/api/v1/getUserData",
            { headers }
          );
          setProfileData(response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      };
      fetchUserData();
    }
  }, [isLoggedIn, navigate]); // Replaced history with navigate

  return (
    <>
      {!ProfileData && <Loader />} {/* Show loader until data is fetched */}
      {ProfileData && (
        <div className="h-auto bg-white px-2 md:px-8 py-8 flex flex-col lg:flex-row gap-4">
          <div className="h-auto lg:h-[80vh] w-full lg:w-1/6 bg-white rounded-lg shadow-md">
            <Sidebar ProfileData={ProfileData} />
          </div>
          {/* Mobile Bar */}
          <MobileBar username={ProfileData.username} />
          <div className="h-[100%] w-full lg:w-5/6 rounded-lg overflow-auto">
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
