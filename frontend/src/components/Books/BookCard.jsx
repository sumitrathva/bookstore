import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const BookCard = ({ image, title, author, price, bookid, addToCart, removeFromFavourite, fav, editBook, deleteBook }) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const headers = {
        bookid: bookid,
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await axios.put(
        "http://localhost:1000/api/v1/add-to-cart",
        { bookid: bookid },
        { headers }
      );
      Swal.fire({
        icon: 'success',
        title: 'Added to Cart',
        text: response.data.message,
      });
      if (addToCart) addToCart(); // Optional: Update state/UI
    } catch (error) {
      console.error("Failed to add to cart:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add book to cart',
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleRemoveFromFavourite = async () => {
    try {
      const headers = {
        bookid: bookid,
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const response = await axios.put(
        "http://localhost:1000/api/v1/remove-from-favourite",
        {},
        { headers }
      );
      Swal.fire({
        icon: 'success',
        title: 'Removed from Favourites',
        text: response.data.message,
      });
      if (removeFromFavourite) removeFromFavourite(); // Optional: Update state/UI
    } catch (error) {
      console.error("Failed to remove from favourites:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to remove book from favourites',
      });
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-teal-200 to-cyan-300 text-gray-800 rounded-lg p-4 shadow-lg">
      <Link to={`/view-book-details/${bookid}`} className="block">
        <div className="w-full flex items-center justify-center bg-white rounded-lg overflow-hidden">
          <img src={image} alt={`Cover of ${title}`} className="h-40 object-cover" />
        </div>
        <h1 className="mt-4 text-xl font-bold">{title}</h1>
        <p className="mt-2 text-gray-600 font-semibold">by {author}</p>
        <p className="mt-2 text-gray-800 font-semibold text-xl">₹ {price}</p>
      </Link>
      {!editBook && !deleteBook && (
        <>
          <button
            aria-label="Add to Cart"
            className="mt-4 bg-blue-500 w-full rounded-lg text-white py-2 font-semibold hover:bg-blue-600 transition-all duration-300"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
          {fav && (
            <button
              aria-label="Remove from Favourites"
              className="mt-4 bg-red-500 w-full rounded-lg text-white py-2 font-semibold hover:bg-red-600 transition-all duration-300"
              onClick={handleRemoveFromFavourite}
            >
              Remove from Favourites
            </button>
          )}
        </>
      )}
      {editBook && deleteBook && (
        <div className="mt-4 flex space-x-2">
          <button
            aria-label="Edit Book"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all duration-300"
            onClick={editBook}
          >
            Edit
          </button>
          <button
            aria-label="Delete Book"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all duration-300"
            onClick={deleteBook}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
