import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, selectWishlistItems } from "../features/wishSlice";

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlist = useSelector(selectWishlistItems);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  return (

          <div className="max-w-6xl mx-auto p-4 sm:p-6 text-red-500">

       <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-red-500 sm:text-center ">My Wishlist</h1>
       
       
      </div>

      {wishlist.length === 0 ? (
        <motion.div 
          className="text-center py-12"
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
              className="flex justify-between items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link
                to={`/card/${item.id}`}
                className="col-span-6 flex gap-4 justify-between sm:items-center"
              >
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              />
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-lg">{item.title}</h3>
                <p className="text-sm">Brand: {item.brand}</p>
                <p className="font-semibold mt-1">${item.price.toFixed(2)}</p>
                
              </div>
              </Link>
              <motion.button 
                onClick={() => handleRemove(item.id)} 
                className="text-red-500 hover:text-red-700 p-2"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </motion.button>
              
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
