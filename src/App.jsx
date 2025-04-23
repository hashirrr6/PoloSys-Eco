import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/navbar";
import Home from "./components/home";
import Footer from "./components/Footer";
import Card from "./components/productCard";
import Cart from "./components/cart";
import About from "./components/about";
import Login from "./components/login";
import Contact from "./components/contacts";
import Wishlist from "./components/whishlist";
import Account from "./components/accountInfo"
import Profile from "./components/profile"
import Sign from "./components/sign"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useIsMobile from "./hooks/useIsMobile";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const hideNavRoutes = ["/login", "/signup"];
  const hideFooter = ["/login", "/signup"];
  const shouldHideNav = hideNavRoutes.includes(location.pathname);
  const shouldHideFooter = hideFooter.includes(location.pathname);

  // 🚀 Handle route redirection based on screen size
  useEffect(() => {
    if (!isMobile && location.pathname === "/account") {
      navigate("/profile", { replace: true });
    } else if (isMobile && location.pathname.startsWith("/profile")) {
      navigate("/account", { replace: true });
    }
  }, [isMobile, location.pathname, navigate]);

  return (
    <>
      {!shouldHideNav && <Nav />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/card/:id" element={<Card />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route
  path="/account"
  element={isMobile ? <Account /> : null}
/>
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/signup" element={<Sign />} />
      </Routes>

      {!shouldHideFooter && <Footer />}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
}



function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
