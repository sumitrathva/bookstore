import React from "react";
import { RxCross1 } from "react-icons/rx";

const SeeUserData = ({ userDivData, userDiv, setUserDiv }) => {
  // Debug log to check state
  console.log("Modal visibility state:", userDiv);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 h-screen w-full bg-zinc-800 opacity-80 ${userDiv}`}
        onClick={() => {
          console.log("Overlay clicked");
          setUserDiv("hidden"); // Ensure the function name matches
        }}
      ></div>
      {/* Modal */}
      <div
        className={`fixed top-0 left-0 h-screen w-full flex items-center justify-center ${userDiv}`}
      >
        <div className="bg-white rounded p-4 w-[80%] md:w-[50%] lg:w-[40%] relative">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">User Information</h1>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => {
                console.log("Close button clicked");
                setUserDiv("hidden"); // Ensure the function name matches
              }}
            >
              <RxCross1 />
            </button>
          </div>
          <div className="mt-2">
            <label>
              Username: <span className="font-semibold">{userDivData.username}</span>
            </label>
          </div>
          <div className="mt-4">
            <label>
              Email: <span className="font-semibold">{userDivData.email}</span>
            </label>
          </div>
          <div className="mt-4">
            <label>
              Address: <span className="font-semibold">{userDivData.address}</span>
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeeUserData;
