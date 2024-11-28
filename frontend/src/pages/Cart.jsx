import React, { useEffect, useState } from "react";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Swal from 'sweetalert2'; // Import SweetAlert2

const Cart = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      const fetchCart = async () => {
        try {
          const res = await axios.get(
            "http://localhost:1000/api/v1/get-user-cart",
            { headers }
          );
          setCart(res.data.data);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to fetch cart items',
          });
        } finally {
          setLoading(false); // Set loading to false once data is fetched
        }
      };
      fetchCart();
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (cart && cart.length > 0) {
      const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);
      setTotal(totalAmount);
    }
  }, [cart]);

  const deleteItem = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/remove-from-cart/${id}`,
        {},
        { headers }
      );
      Swal.fire({
        icon: 'success',
        title: 'Item Removed',
        text: response.data.message,
      });
      setCart(cart.filter(item => item._id !== id)); // Update cart state
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to remove item from cart',
      });
    }
  };

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/place-order",
        { order: cart },
        { headers }
      );
      Swal.fire({
        icon: 'success',
        title: 'Order Placed',
        text: response.data.message,
      }).then(() => {
        navigate("/profile/orderHistory");
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to place order',
      });
    }
  };

  if (loading) {
    return <Loader />; // Display loader when loading
  }

  return (
    <div className="h-auto bg-white px-12 py-8">
      {cart.length === 0 ? (
        <div className="h-screen flex items-center justify-center flex-col">
          <h1 className="text-5xl lg:text-6xl font-semibold text-gray-400">
            Empty Cart
          </h1>
          <img
            src="/empty-cart.png"
            alt="empty cart"
            className="lg:h-[50vh]"
          />
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-semibold text-gray-500 mb-8">
            Your Cart
          </h1>
          {cart.map((items) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-gray-200 justify-between items-center"
              key={items._id} // Use unique ID as key
            >
              <img
                src={items.url}
                alt={items.title}
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-gray-800 font-semibold text-start mt-2 md:mt-0">
                  {items.title}
                </h1>
                <p className="text-normal text-gray-600 mt-2 hidden lg:block">
                  {items.desc.slice(0, 100)}...
                </p>
                <p className="text-normal text-gray-600 mt-2 hidden md:block lg:hidden">
                  {items.desc.slice(0, 65)}...
                </p>
                <p className="text-normal text-gray-600 mt-2 block md:hidden">
                  {items.desc.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-gray-800 text-3xl font-semibold flex">
                  ₹ {items.price}
                </h2>
                <button
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                  onClick={() => deleteItem(items._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 w-full flex items-center justify-end">
            <div className="p-4 bg-gray-200 rounded">
              <h1 className="text-3xl text-gray-800 font-semibold">
                Total Amount
              </h1>
              <div className="mt-3 flex items-center justify-between text-xl text-gray-800">
                <h2>{cart.length} books</h2> <h2>₹ {total}</h2>
              </div>
              <div className="w-[100%] mt-3">
                <button
                  className="bg-gray-800 text-white rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-gray-900"
                  onClick={placeOrder}
                >
                  Place your order
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
