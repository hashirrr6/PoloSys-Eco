import { BrowserRouter ,Routes,Route } from "react-router-dom";
import Nav from "./components/navbar"
import Home from "./components/home"
import Footer  from "./components/Footer";
import Card from "./components/productCard";
import Cart from "./components/cart"
import About from "./components/about";
import Login from "./components/login";
import Contact from "./components/contacts";
import Wishlist from "./components/whishlist";
 function App(){
 return(

  <BrowserRouter>
  <Nav/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/card/:id" element={<Card/>}/> 
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/contact" element={<Contact/>}/>
    <Route path="/wishlist" element={<Wishlist/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
)
}
export default App