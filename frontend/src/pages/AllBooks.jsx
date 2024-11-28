import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../components/Books/BookCard";
import Loader from "./Loader";
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AllBooks = () => {
  const [Books, setBooks] = useState([]);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-books"
        );
        setBooks(response.data.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load books',
        });
      }
    };
    fetch();
  }, []);

  const handleAddToCart = async (bookid) => {
    try {
      const headers = {
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
    } catch (error) {
      console.error("Failed to add to cart:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add book to cart',
      });
    }
  };

  const handleEdit = (bookid) => {
    navigate(`/update-book/${bookid}`); // Navigate to update page
  };

  const handleDelete = async (bookid) => {
    try {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: bookid,
      };
      const response = await axios.delete(
        "http://localhost:1000/api/v1/delete-book",
        { headers }
      );
      Swal.fire({
        icon: 'success',
        title: 'Book Deleted',
        text: response.data.message,
      }).then(() => {
        setBooks(Books.filter((book) => book._id !== bookid));
      });
    } catch (error) {
      console.error("Failed to delete book:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete book',
      });
    }
  };

  return (
    <div className="bg-gradient-to-br from-teal-400 to-cyan-500 min-h-screen w-full flex flex-col px-6 py-12">
      {Books.length === 0 ? <Loader /> : (
        <div className="w-full flex flex-col items-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 text-center">
            Discover Our Vibrant Book Collection
          </h1>
          <p className="text-lg text-white mb-10 text-center">
            Dive into a world of colors, stories, and knowledge.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Books.map((items, i) => (
              <BookCard
                key={i}
                bookid={items._id}
                image={items.url}
                title={items.title}
                author={items.author}
                price={items.price}
                addToCart={() => handleAddToCart(items._id)}
                editBook={role === "admin" ? () => handleEdit(items._id) : null}
                deleteBook={role === "admin" ? () => handleDelete(items._id) : null}
                isAdmin={role === "admin"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBooks;
