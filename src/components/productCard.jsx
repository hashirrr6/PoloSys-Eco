// src/pages/Card.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cartSlice";
import { toggleWishlist } from "../features/wishSlice";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash, faStar, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Review from "./review";
import {
  updateQuantity,
  selectCartItems,
  selectCartTotal,
} from "../features/cartSlice";

const Card = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const cartItems = useSelector((state) => state.cart.items);
  const wishlist = useSelector((state) => state.wishlist);

  const isInCart = cartItems.some((item) => item.id === parseInt(id));
  const isWishlisted = wishlist.some((item) => item.id === parseInt(id));

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Failed to fetch product", err));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({ ...product, quantity }));
  };
  

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };
  
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  if (!product) {
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="product grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-4 md:p-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Product Image */}
          <motion.div
            className="image bg-white p-4 rounded-lg shadow-md flex justify-center"
            whileHover={{
              scale: 0.98,
              boxShadow: "0px 10px 20px rgba(255, 0, 0, 0.2)",
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full max-w-md h-auto md:h-[500px] object-contain rounded-lg"
            />
          </motion.div>

          {/* Product Details */}
          <div className="details flex flex-col space-y-4 md:space-y-6">
            <div className="title">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{product.title}</h2>
              <h4 className="text-gray-500 text-lg mt-1">Brand: {product.brand}</h4>
            </div>

            {/* Price Section */}
            <div className="price bg-white p-4 rounded-lg shadow-sm">
              <div className="flex flex-col">
                <p className="text-sm text-gray-500 line-through mb-1">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </p>
                <div className="flex items-center flex-wrap gap-2">
                  <span className="text-2xl font-semibold text-gray-800">
                    ${product.price}
                  </span>
                  <span className="bg-red-100 text-red-800 font-medium px-2 py-1 rounded text-xs md:text-sm">
                    {product.discountPercentage}% OFF
                  </span>
                  <span className="text-gray-500 text-sm ml-auto">
                    ({product.stock} in stock)
                  </span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="rating flex items-center gap-1">
  {[...Array(5)].map((_, i) => {
    const ratingValue = i + 1;
    const isFilled = ratingValue <= Math.floor(product.rating);
    const isHalf = !isFilled && (product.rating % 1 > 0.3) && (Math.ceil(product.rating) === ratingValue);
    
    return (
      <div key={i} className="relative inline-block w-4 h-4">
        <FontAwesomeIcon 
          icon={faStar}
          className="absolute text-gray-300"
        />
        {isFilled && (
          <FontAwesomeIcon 
            icon={faStar}
            className="absolute text-yellow-500"
          />
        )}
        {isHalf && (
          <div className="absolute overflow-hidden" style={{ width: '50%' }}>
            <FontAwesomeIcon 
              icon={faStar}
              className="text-yellow-500"
            />
          </div>
        )}
      </div>
    );
  })}
  <span className="text-gray-700 font-medium ml-1">({product.rating})</span>
</div>

            {/* Description */}
            <div className="description  p-4 rounded-lg shadow-sm">
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Quantity Controls (only shown if in cart) */}
            {!isInCart && (
  <div className="flex justify-center items-center p-4 rounded-lg shadow-sm">
    <div className="flex items-center gap-3 border px-4 py-2 rounded-full">
      <button
        onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
        className="hover:text-red-600 disabled:opacity-30 text-gray-700"
        disabled={quantity <= 1}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <span className="min-w-[24px] text-center font-medium text-gray-800">
        {quantity}
      </span>
      <button
        onClick={() => setQuantity((prev) => prev + 1)}
        className="hover:text-green-600 text-gray-700"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  </div>
)}


            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {isInCart ? (
                <>
                  <button
                    onClick={() => navigate("/cart")}
                    className="flex-1 bg-red-500 px-4 py-3 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Go to Cart
                  </button>
                  
                </>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-red-500 px-4 py-3 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Add to Cart
                </button>
              )}

              <button
                onClick={() => dispatch(toggleWishlist(product))}
                className={`p-3 rounded-lg transition-all flex items-center justify-center ${
                  isWishlisted
                    ? "text-red-600 bg-red-50 border border-red-200"
                    : "text-gray-400 bg-gray-50 border border-gray-200 hover:bg-red-50 hover:text-red-500"
                }`}
              >
                <FontAwesomeIcon icon={faHeart} className="text-xl" />
              </button>
            </div>
          </div>
        </motion.div>
        
        {/* Reviews Section */}
        <div className="mt-12">
          <Review />
        </div>
      </div>
    </div>
  );
};

export default Card;