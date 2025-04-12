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
import Profile from "./components/profile"
import Sign from "./components/sign"
import { useLocation } from "react-router-dom";

// Component that handles routes + nav logic
function AppContent() {
  const location = useLocation();
  const hideNavRoutes = ["/login","/signup" ];
  const hideFooter=["/login","/signup"];
  const shouldHideFooter=hideFooter.includes(location.pathname)
  const shouldHideNav = hideNavRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNav && <Nav />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/card/:id" element={<Card />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile/*" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/signup" element={<Sign/>}/>
      </Routes>
      {!shouldHideFooter && <Footer/>}    </>
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
