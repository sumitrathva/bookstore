import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import Loader from "./Loader";
import { FaShoppingCart } from "react-icons/fa";
import { GrLanguage } from "react-icons/gr";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { GoHeartFill } from "react-icons/go";
import Swal from 'sweetalert2'; // Import SweetAlert2

const ViewBookDetails = () => {
  const { id } = useParams();
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const [Book, setBook] = useState(null); // Use null initially
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isAddingToFav, setIsAddingToFav] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      try {
        const res = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
        setBook(res.data.data);
      } catch (error) {
        console.error("Failed to fetch book details:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load book details',
        });
      }
    };
    fetch();
  }, [id]);

  const headers = {
    bookid: id,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const addToFavourite = async () => {
    setIsAddingToFav(true);
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-to-favourite",
        {},
        { headers }
      );
      Swal.fire({
        icon: 'success',
        title: 'Added to Favourites',
        text: response.data.message,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add to favourites',
      });
      console.error("Failed to add to favourites:", error);
    } finally {
      setIsAddingToFav(false);
    }
  };

  const addToCart = async () => {
    setIsAddingToCart(true);
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-to-cart",
        {},
        { headers }
      );
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: response.data.message,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add to cart',
      });
      console.error("Failed to add to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const deleteBook = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:1000/api/v1/delete-book",
        { headers }
      );
      Swal.fire({
        icon: 'success',
        title: 'Book Deleted',
        text: response.data.message,
      }).then(() => {
        navigate("/all-books");
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to delete book',
      });
      console.error("Error details:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      {!Book ? <Loader /> : (
        <div className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 text-white px-6 py-12 md:px-12 md:py-16 flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col lg:w-1/2">
            <img
              src={Book.url}
              alt="book"
              className="w-full max-w-md h-auto object-contain rounded-lg shadow-lg border border-white"
            />
            {localStorage.getItem("id") && (
              <div className="mt-4 flex flex-row justify-around lg:flex-col lg:justify-start lg:mt-8">
                {role !== "admin" && (
                  <>
                    <button
                      className={`bg-white text-gray-800 p-3 rounded-lg text-xl font-semibold flex items-center transition-all duration-300 ${isAddingToFav ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'hover:bg-gray-200'
                        }`}
                      onClick={addToFavourite}
                      disabled={isAddingToFav}
                    >
                      <GoHeartFill className="text-red-500" />
                      <span className="ml-2">{isAddingToFav ? "Adding..." : "Add to Favourites"}</span>
                    </button>
                    <button
                      className={`mt-4 lg:mt-8 p-3 rounded-lg text-xl font-semibold flex items-center transition-all duration-300 ${isAddingToCart ? 'bg-green-600 text-white cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'
                        }`}
                      onClick={addToCart}
                      disabled={isAddingToCart}
                    >
                      <FaShoppingCart className="text-white" />
                      <span className="ml-2">{isAddingToCart ? "Adding..." : "Add to Cart"}</span>
                    </button>
                  </>
                )}
                {role === "admin" && (
                  <>
                    <Link
                      to={`/update-book/${id}`}
                      className="bg-white text-gray-800 p-3 rounded-lg text-xl font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center"
                    >
                      <FaRegEdit className="text-blue-500" />
                      <span className="ml-2">Edit</span>
                    </Link>
                    <button
                      className="mt-4 lg:mt-8 bg-red-500 text-white p-3 rounded-lg text-xl font-semibold hover:bg-red-600 transition-colors duration-300 flex items-center"
                      onClick={deleteBook}
                    >
                      <MdDelete className="text-white" />
                      <span className="ml-2">Delete</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{Book.title}</h1>
            <p className="text-lg mb-4">by {Book.author}</p>
            <p className="mb-6 text-lg">{Book.desc}</p>
            <p className="flex items-center mb-4">
              <GrLanguage className="text-lg mr-2" /> {Book.language}
            </p>
            <p className="text-3xl font-semibold">Price: ₹ {Book.price}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
