import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import Swal from "sweetalert2";

const Settings = () => {
  const [ProfileData, setProfileData] = useState();
  const [Value, setValue] = useState({ address: "" });

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/getUserData",
        { headers }
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const updateAddress = async () => {
    try {
      const res = await axios.put(
        "http://localhost:1000/api/v1/update-user-address",
        Value,
        { headers }
      );
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: res.data.message,
        confirmButtonColor: "#1E90FF", // Matches the button color
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-auto bg-white px-12 py-8">
      {!ProfileData && <Loader />}
      {ProfileData && (
        <div className="p-0 md:p-4 text-gray-800">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div>
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-gray-200 mt-2 font-semibold">
                {ProfileData.username}
              </p>
            </div>
            <div>
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-gray-200 mt-2 font-semibold">
                {ProfileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              className="p-2 rounded bg-gray-200 mt-2 font-semibold"
              rows="5"
              placeholder="Address"
              name="address"
              value={Value.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-blue-600 text-white font-semibold px-3 py-2 rounded hover:bg-blue-700 transition-all duration-300"
              onClick={updateAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
