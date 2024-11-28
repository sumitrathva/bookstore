import React, { useEffect, useState } from "react";
import BookCard from "../Books/BookCard";
import axios from "axios";

const RecentlyAdded = () => {
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-recent-books");
        setBooks(response.data.data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-400 to-green-400 px-12 py-8">
      <h1 className="text-white text-4xl font-bold text-center mb-8">Recently Added Books</h1>
      {Books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Books.map((item, i) => (
            <BookCard
              bookid={item._id}
              image={item.url}
              title={item.title}
              author={item.author}
              price={item.price}
              key={i}
            />
          ))}
        </div>
      ) : (
        <p className="text-white text-center text-xl">No books available at the moment.</p>
      )}
    </div>
  );
};

export default RecentlyAdded;
