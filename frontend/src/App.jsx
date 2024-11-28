import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";
import AllBooks from "./pages/AllBooks";
import ViewBookDetails from "./pages/ViewBookDetails";
import { authActions } from "./store/auth";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Favourite from "./pages/Favourite";
import OrderHistory from "./pages/OrderHistory";
import Settings from "./pages/Settings";
import AllOrders from "./components/AdminPages/AllOrders";
import AddBook from "./components/AdminPages/AddBook";
import UpdateBooks from "./components/AdminPages/UpdateBooks";
import AboutUs from "./pages/AboutUs";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    // Checking local storage for auth data and updating Redux state
    const storedId = localStorage.getItem("id");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedId && storedToken && storedRole) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(storedRole));
    }
  }, [dispatch]);

  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about-us" element={<AboutUs />} />

        {/* Profile routes */}
        <Route path="/profile" element={<Profile />}>
          {role !== "admin" ? (
            <>
              <Route index element={<Favourite />} />
              <Route path="order-history" element={<OrderHistory />} />
              <Route path="settings" element={<Settings />} />
            </>
          ) : (
            <>
              <Route index element={<AllOrders />} />
              <Route path="add-book" element={<AddBook />} />
            </>
          )}
        </Route>

        {/* Admin-only routes */}
        {role === "admin" && (
          <Route path="/update-book/:id" element={<UpdateBooks />} />
        )}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
