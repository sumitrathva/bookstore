import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert2

const UpdateBooks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );

      setData({
        url: res.data.data.url,
        title: res.data.data.title,
        author: res.data.data.author,
        price: res.data.data.price,
        desc: res.data.data.desc,
        language: res.data.data.language,
      });
    };
    fetch();
  }, [id]);

  const headers = {
    bookid: id,
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const update = async () => {
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
          icon: 'warning',
          title: 'Missing Fields',
          text: 'All fields are required',
        });
      } else {
        const response = await axios.put(
          "http://localhost:1000/api/v1/update-book",
          Data,
          { headers }
        );
        Swal.fire({
          icon: 'success',
          title: 'Book Updated',
          text: response.data.message,
        });
        navigate(`/view-book-details/${id}`);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className="px-8 py-10 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 shadow-lg">
        Update Book
      </h1>
      <div className="p-6 bg-white rounded-lg shadow-2xl w-full max-w-xl">
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-200 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter image URL"
            name="url"
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Book Title</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-200 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter book title"
            name="title"
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Author</label>
          <input
            type="text"
            className="w-full px-3 py-2 bg-gray-200 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter author name"
            name="author"
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label className="block text-gray-700 font-semibold mb-2">Language</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-gray-200 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter language"
              name="language"
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 font-semibold mb-2">Price</label>
            <input
              type="number"
              className="w-full px-3 py-2 bg-gray-200 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter price"
              name="price"
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            className="w-full px-3 py-2 bg-gray-200 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="5"
            placeholder="Enter book description"
            name="desc"
            value={Data.desc}
            onChange={change}
          />
        </div>
        <button
          className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
          onClick={update}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBooks;
