import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  function removeFromWishlist(productId) {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <motion.div 
          className="text-center py-12 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Your wishlist is empty. Add items to your wishlist to view them here.
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlist.map((item) => (
            <motion.div 
              key={item.id} 
              className="flex items-center p-4 border rounded-lg shadow-md "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              />
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-lg">{item.title}</h3>
                <p className="text-gray-500 text-sm">Brand: {item.brand}</p>
                <p className="text-gray-700 font-semibold mt-1">${item.price.toFixed(2)}</p>
              </div>
              <button 
                onClick={() => removeFromWishlist(item.id)} 
                className="text-red-500 hover:text-red-700 p-2"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
