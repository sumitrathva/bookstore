import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Default links to show
  let links = [
    { id: 1, title: "Home", link: "/" },
    { id: 2, title: "All Books", link: "/all-books" },
  ];

  // Show Cart link only if logged in and not an admin
  if (isLoggedIn && role !== "admin") {
    links.push({ id: 3, title: "Cart", link: "/cart" });
  }

  // Add Profile links based on role
  if (isLoggedIn) {
    if (role === "user") {
      links.push({ id: 4, title: "Profile", link: "/profile" });
    } else if (role === "admin") {
      links.push({ id: 4, title: "Admin Profile", link: "/profile" });
    }
  }

  const [Nav, setNav] = useState("hidden");

  return (
    <>
      <nav className="relative flex w-full flex-nowrap items-center justify-between bg-gradient-to-r from-teal-400 to-blue-500 py-4 text-white shadow-lg lg:flex-wrap lg:justify-start lg:py-4">
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div className="ms-2 w-3/6 lg:w-1/6">
            <Link
              to="/"
              className="flex text-2xl font-semibold items-center justify-center"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                alt="logo"
                className="h-10 me-4"
              />
              BookHeaven
            </Link>
          </div>
          <div className="w-1/6 block lg:hidden">
            <button
              aria-label="Toggle Navigation"
              className="block border-0 bg-transparent px-2 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 lg:hidden"
              type="button"
              onClick={() => setNav(Nav === "hidden" ? "block" : "hidden")}
            >
              <span className="[&>svg]:w-7 [&>svg]:stroke-white ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
                </svg>
              </span>
            </button>
          </div>

          <div className="5/6 hidden lg:block">
            <div className="flex items-center">
              {links.map((item) => (
                <div
                  className={`mx-3 rounded transition-all duration-300 hover:cursor-pointer ${location.pathname === item.link
                    ? "text-white"
                    : "hover:text-gray-300"
                    }`}
                  key={item.id}
                >
                  <Link to={item.link} className="text-normal">
                    {item.title}
                  </Link>
                </div>
              ))}
              {!isLoggedIn && (
                <>
                  <Link
                    to="/login"
                    className="rounded px-3 py-1 mx-3 hover:bg-teal-600 hover:text-white transition-all duration-300"
                  >
                    LogIn
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded px-3 py-1 mx-3 hover:bg-teal-500 hover:text-white transition-all duration-300"
                  >
                    SignUp
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`5/6 ${Nav} lg:hidden bg-gradient-to-r from-teal-400 to-blue-500 text-white px-12`}
      >
        <div className="flex flex-col items-center">
          {links.map((item) => (
            <div
              className={`my-3 rounded transition-all duration-300 hover:cursor-pointer ${location.pathname === item.link
                ? "text-white"
                : "hover:text-gray-300"
                }`}
              key={item.id}
            >
              <Link
                to={item.link}
                className="text-normal"
                onClick={() => setNav("hidden")}
              >
                {item.title}
              </Link>
            </div>
          ))}
          {!isLoggedIn && (
            <>
              <Link
                to="/login"
                className="rounded px-3 py-1 mx-3 hover:bg-teal-600 hover:text-white transition-all duration-300"
              >
                LogIn
              </Link>
              <Link
                to="/signup"
                className="rounded px-3 py-1 my-4 md:my-0 mx-3 hover:bg-teal-500 hover:text-white transition-all duration-300"
              >
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
