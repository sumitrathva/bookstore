import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "../components/Books/BookCard";
import Loader from "./Loader";

const Favourite = () => {
  const [FavBooks, setFavBooks] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        "http://localhost:1000/api/v1/get-favourite-books",
        { headers }
      );
      setFavBooks(res.data.data);
    };
    fetch();
  });

  return (
    <div className="h-auto bg-white px-12 py-8">
      {!FavBooks && <Loader />}
      {FavBooks && FavBooks.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-gray-400 mb-8">
              No Favourite Books
            </h1>
            <img src="./star.png" alt="" className="h-[20vh] mb-8" />
          </div>
        </div>
      )}
      {FavBooks && FavBooks.length > 0 && (
        <div>
          <h1 className="text-5xl font-semibold text-gray-500 mb-8">
            Your Favourite Books
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {FavBooks.map((items, i) => (
              <BookCard
                bookid={items._id}
                image={items.url}
                title={items.title}
                author={items.author}
                price={items.price}
                key={i}
                fav={true}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Favourite;
