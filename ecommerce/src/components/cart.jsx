import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Cart = ({ onUpdateCart }) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [shippingMethod, setShippingMethod] = useState("pickup");

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Initialize quantities if not present
    const itemsWithQuantity = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1
    }));
    
    setCartItems(itemsWithQuantity);
  }, []);

  // Remove item from cart
  function removeFromCart(productId) {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    
    if (onUpdateCart) onUpdateCart(updatedCart);
  }

  // Update quantity
  function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;
    
    const updatedCart = cartItems.map(item => 
      item.id === productId ? {...item, quantity: newQuantity} : item
    );
    
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    if (onUpdateCart) onUpdateCart(updatedCart);
  }

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => 
    acc + (item.price * (item.quantity || 1)), 0
  );

  // Shipping cost
  const shippingCost = shippingMethod === "pickup" ? 0 : 9.90;
  
  // Total cost
  const totalCost = subtotal + shippingCost;

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">My Cart</h1>
        <button 
          onClick={() => navigate("/")} 
          className="flex items-center text-gray-500 hover:text-gray-700"
        >
          ← Continue shopping
        </button>
      </div>

      {cartItems.length === 0 ? (
        <motion.div 
          className="text-center py-12 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Your cart is empty. Start shopping to add items to your cart.
        </motion.div>
      ) : (
        <>
          <div className="grid grid-cols-12 gap-4 py-4 border-b text-sm text-gray-500 uppercase">
            <div className="col-span-6">PRODUCT</div>
            <div className="col-span-2 text-right">PRICE</div>
            <div className="col-span-2 text-center">QTY</div>
            <div className="col-span-2 text-right">TOTAL</div>
          </div>

          {cartItems.map((item) => (
            <motion.div 
              key={item.id} 
              className="grid grid-cols-12 gap-4 py-6 border-b"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
      <Link to={`/card/${item.id}`} className="col-span-6 flex gap-4 hover:p-2 rounded-lg transition">
               <div className="col-span-6 flex gap-4">
                <img src={item.thumbnail} alt={item.title} className="w-24 h-24 object-cover bg-gray-100 rounded-lg" />
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">#{item.id}</p>
                  <p className="text-gray-500 text-sm mt-1">
                    Brand: {item.brand}
                  </p>
                </div>
              </div>
              </Link>
              
              <div className="col-span-2 flex flex-col text-gray-600 text-right">
                <p className="font-medium mt-auto">${item.price.toFixed(2)}</p>
                {item.discountPercentage && (
                  <p className="text-sm text-green-600">-{item.discountPercentage}% off</p>
                )}
              </div>
              
              <div className="col-span-2 flex justify-center items-center">
                <div className="flex items-center gap-2 border rounded-lg px-2 py-1">
                  <button 
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                    className="text-red-400 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="mx-2">{item.quantity || 1}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                    className="text-red-400 hover:text-red-700"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
              
              <div className="col-span-2 flex justify-end items-center gap-4">
                <span className="font-medium">${((item.price * (item.quantity || 1))).toFixed(2)}</span>
                <button 
                  onClick={() => removeFromCart(item.id)} 
                  className="text-gray-400 hover:text-red-500"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </motion.div>
          ))}
   <div className="tot border rounded-xl p-4 m-4">

          <div className="mt-8 p-4  rounded-lg">
            <h3 className="font-medium mb-4">Choose shipping mode:</h3>
            
            <div className="flex flex-col gap-">
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="shipping" 
                  checked={shippingMethod === "pickup"} 
                  onChange={() => setShippingMethod("pickup")}
                  className="accent-red-500"
                />
                <span className="flex-1">Store pickup (In 20 min)</span>
                <span className="font-medium">FREE</span>
              </label>
              
              <label className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="shipping" 
                  checked={shippingMethod === "delivery"} 
                  onChange={() => setShippingMethod("delivery")}
                  className="accent-red-500"
                />
                <span className="flex-1">Delivery at home (Under 2-4 day)</span>
                <span className="font-medium">$9.90</span>
              </label>
              
              {shippingMethod === "delivery" && (
                <p className="text-sm text-gray-800 ml-6">At 45 Glenridge Ave, Brooklyn, NY 11230</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col items-end gap-2 text-sm text-gray-500 ">
            <div className="w-1/3 flex justify-between">
              <span>SUBTOTAL</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="w-1/3 flex justify-between border-b pb-2">
              <span>SHIPPING</span>
              <span className="font-medium">{shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`}</span>
            </div>
            <div className="w-1/3 flex justify-between">
              <span>TOTAL</span>
              <span className="font-medium">${totalCost.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 flex justify-end ">
            <motion.button
              onClick={() => alert("Proceeding to checkout...")}
              className="bg-red-400 text-white px-6 py-3 rounded hover:bg-red-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Checkout
              <span className="ml-4">${totalCost.toFixed(2)}</span>
            </motion.button>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;