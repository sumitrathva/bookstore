import React, { useEffect, useState, useMemo } from "react";
import Loader from "./Loader";
import axios from "axios";
import { Link } from "react-router-dom";

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const headers = useMemo(() => ({
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }), []);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const res = await axios.get("http://localhost:1000/api/v1/get-order-history", { headers });
        setOrderHistory(res.data.data);
      } catch (err) {
        console.error("Failed to fetch order history:", err);
        setError("Failed to load order history. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderHistory();
  }, [headers]);

  const renderBookDetails = (book) => {
    if (!book) {
      return <span>Details Unavailable</span>;
    }
    return (
      <>
        <Link to={`/view-book-details/${book._id}`} className="text-blue-500 hover:text-blue-400">
          {book.title}
        </Link>
        <h1>{book.desc.slice(0, 50)} ...</h1>
        <h1>₹ {book.price}</h1>
      </>
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="h-[80vh] p-4 flex flex-col items-center justify-center bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 text-gray-800">
        <h1 className="text-3xl font-semibold text-red-600">{error}</h1>
      </div>
    );
  }

  return (
    <>
      {orderHistory.length === 0 ? (
        <div className="h-[80vh] p-4 flex flex-col items-center justify-center bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 text-gray-800">
          <h1 className="text-5xl font-semibold text-gray-900 mb-8">No Order History</h1>
          <img
            src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
            alt="No Orders"
            className="h-[20vh] mb-8"
          />
          <Link to="/all-books" className="text-blue-500 underline">Explore Books</Link>
        </div>
      ) : (
        <div className="h-full p-4 bg-gradient-to-r from-green-100 via-blue-100 to-teal-100 text-gray-800">
          <h1 className="text-3xl md:text-5xl font-semibold text-blue-600 mb-8 text-center">
            Your Order History
          </h1>
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <div className="bg-yellow-200 flex items-center px-4 py-2 text-gray-900 font-semibold">
              <div className="w-1/12 text-center text-blue-800">Sr.</div>
              <div className="w-4/12 text-ellipsis overflow-hidden text-blue-800">Books</div>
              <div className="w-4/12 hidden md:block text-ellipsis overflow-hidden text-blue-800">Description</div>
              <div className="w-2/12 text-center text-blue-800">Price</div>
              <div className="w-2/12 text-center text-blue-800">Status</div>
              <div className="w-1/12 text-center hidden md:block text-blue-800">Mode</div>
            </div>
            {orderHistory.map(({ _id, book, status }, i) => (
              <div key={_id} className="bg-white flex items-center justify-between px-4 py-2 hover:bg-yellow-50 transition-all duration-300">
                <div className="w-1/12 text-center text-blue-800">{i + 1}</div>
                <div className="w-4/12 text-ellipsis overflow-hidden text-blue-800">{renderBookDetails(book)}</div>
                <div className="w-4/12 hidden md:block text-ellipsis overflow-hidden text-blue-800">
                  {book ? book.desc.slice(0, 50) + " ..." : "Description Unavailable"}
                </div>
                <div className="w-2/12 text-center text-blue-800">
                  {book ? `₹ ${book.price}` : "Price Unavailable"}
                </div>
                <div className="w-2/12 text-center">
                  <h1 className={`font-semibold ${status === "Order placed" ? "text-yellow-500" : status === "Canceled" ? "text-red-500" : "text-green-500"}`}>
                    {status}
                  </h1>
                </div>
                <div className="w-1/12 hidden md:block text-center">
                  <h1 className="text-sm text-zinc-400">COD</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderHistory;
