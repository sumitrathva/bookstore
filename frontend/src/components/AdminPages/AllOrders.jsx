import React, { useEffect, useState } from "react";
import Loader from "../../pages/Loader";
import { FaUserLarge } from "react-icons/fa6";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoOpenOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import Swal from "sweetalert2";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState(null);
  const [editableDiv, setEditableDiv] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1000/api/v1/get-all-orders",
          { headers }
        );
        setOrderHistory(res.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetch();
  }, [headers]);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = orderHistory[i]?._id;
    if (!id) {
      console.error("Order ID is missing");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-status/${id}`,
        values,
        { headers }
      );
      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Error updating status',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error("Error updating status:", error);
    }
  };

  return (
    <>
      {!orderHistory.length && <Loader />}
      {!orderHistory.length && (
        <div className="h-[80vh] p-4 flex flex-col items-center justify-center bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 text-gray-800">
          <h1 className="text-5xl font-bold mb-8 text-gray-900">No Order History</h1>
          <img
            src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
            alt="No orders"
            className="h-[20vh] mb-8"
          />
        </div>
      )}
      {orderHistory.length > 0 && (
        <div className="h-full p-4 bg-gradient-to-r from-green-100 via-blue-100 to-teal-100 text-gray-800">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
              All Orders History
            </h1>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <div className="bg-yellow-200 flex items-center px-4 py-2 text-gray-900 font-semibold">
              <div className="w-1/12 text-center text-blue-800">Sr.</div>
              <div className="w-4/12 text-ellipsis overflow-hidden text-blue-800">Books</div>
              <div className="w-4/12 hidden md:block text-ellipsis overflow-hidden text-blue-800">Description</div>
              <div className="w-2/12 text-center text-blue-800">Price</div>
              <div className="w-2/12 text-center text-blue-800">Status</div>
              <div className="w-1/12 text-center text-blue-800">
                <FaUserLarge />
              </div>
            </div>
            {orderHistory.map((items, i) => {
              if (!items || !items.book) return null; // Skip invalid items

              const id = items._id;
              return (
                <div
                  key={i}
                  className="bg-white flex items-center justify-between px-4 py-2 hover:bg-yellow-50 transition-all duration-300"
                >
                  <div className="w-1/12 text-center text-blue-800">{i + 1}</div>
                  <div className="w-4/12 text-ellipsis overflow-hidden text-blue-800">
                    <Link
                      to={`/view-book-details/${items.book?._id}`}
                      className="text-blue-500 hover:text-blue-400"
                    >
                      {items.book.title}
                    </Link>
                  </div>
                  <div className="w-4/12 hidden md:block text-ellipsis overflow-hidden text-blue-800">
                    {items.book.desc?.slice(0, 50)}...
                  </div>
                  <div className="w-2/12 text-center text-blue-800">₹ {items.book.price}</div>
                  <div className="w-2/12 text-center">
                    <button
                      className={`text-lg font-semibold ${items.status === "Order placed" ? "text-yellow-500" :
                        items.status === "Canceled" ? "text-red-500" :
                          "text-green-500"
                        }`}
                      onClick={() => setEditableDiv(i)}
                    >
                      {items.status}
                    </button>
                    {editableDiv === i && (
                      <div className="mt-2 flex space-x-2">
                        <select
                          name="status"
                          className="bg-gray-200 text-gray-800 rounded border border-gray-400"
                          onChange={change}
                        >
                          {[
                            "Order placed",
                            "Out for delivery",
                            "Delivered",
                            "Canceled",
                          ].map((status, index) => (
                            <option value={status} key={index}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <button
                          className="text-green-500 hover:text-green-600 mx-2"
                          onClick={() => {
                            setEditableDiv(-1);
                            submitChanges(i);
                          }}
                        >
                          <FaCheck />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="w-1/12 text-center">
                    <button
                      className="text-xl text-orange-500 hover:text-orange-400"
                      onClick={() => {
                        setUserDiv("fixed");
                        setUserDivData(items.user);
                      }}
                    >
                      <IoOpenOutline />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setUserDiv={setUserDiv} // Ensure the function name is correct
        />
      )}
    </>
  );
};

export default AllOrders;
