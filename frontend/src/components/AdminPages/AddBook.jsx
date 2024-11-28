import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        Swal.fire({
          title: 'Error!',
          text: 'All fields are required',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/add-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        Swal.fire({
          title: 'Success!',
          text: response.data.message,
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'An error occurred',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
        Add a New Book
      </h1>
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div>
          <label htmlFor="url" className="text-gray-700 font-semibold">
            Image
          </label>
          <input
            type="text"
            id="url"
            className="w-full mt-2 p-2 border-2 border-gray-300 rounded focus:border-pink-400"
            placeholder="URL of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="title" className="text-gray-700 font-semibold">
            Title of book
          </label>
          <input
            type="text"
            id="title"
            className="w-full mt-2 p-2 border-2 border-gray-300 rounded focus:border-pink-400"
            placeholder="Title of book"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="author" className="text-gray-700 font-semibold">
            Author of book
          </label>
          <input
            type="text"
            id="author"
            className="w-full mt-2 p-2 border-2 border-gray-300 rounded focus:border-pink-400"
            placeholder="Author of book"
            name="author"
            required
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-1/2">
            <label htmlFor="language" className="text-gray-700 font-semibold">
              Language
            </label>
            <input
              type="text"
              id="language"
              className="w-full mt-2 p-2 border-2 border-gray-300 rounded focus:border-pink-400"
              placeholder="Language of book"
              name="language"
              required
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="price" className="text-gray-700 font-semibold">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="w-full mt-2 p-2 border-2 border-gray-300 rounded focus:border-pink-400"
              placeholder="Price of book"
              name="price"
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="desc" className="text-gray-700 font-semibold">
            Description of book
          </label>
          <textarea
            id="desc"
            className="w-full mt-2 p-2 border-2 border-gray-300 rounded focus:border-pink-400"
            rows="5"
            placeholder="Description of book"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>

        <button
          className="w-full mt-6 px-4 py-2 text-lg font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded hover:from-green-500 hover:to-blue-600 transition-all duration-300"
          onClick={submit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
