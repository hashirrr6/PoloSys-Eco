// src/pages/Card.jsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../features/cartSlice";
import { toggleWishlist } from "../features/wishSlice";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash, faStar,faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import Review  from "./review";
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
    dispatch(addToCart({ ...product, quantity: 1 }));
  };
const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };
  
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  if (!product) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (<>
    <div className="flex items-center justify-center">
      <motion.div
        className="product grid grid-cols-2 gap-8 items-center p-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="image border p-4 rounded-lg shadow-lg"
          whileHover={{
            scale: 0.95,
            boxShadow: "0px 10px 20px rgba(255, 0, 0, 0.3)",
          }}
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-[600px] h-[600px] object-cover rounded-lg"
          />
        </motion.div>

        <div className="details flex flex-col space-y-4 justify-center items-center gap-8">
          <div className="title flex flex-col items-center">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <h4 className="text-gray-500">Brand: {product.brand}</h4>
          </div>

          <div className="price flex ">
          <h2 className="text-2xl font-semibold text-gray-800 m-4">
          <p className="text-sm text-gray-500 line-through ">
     ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
  </p>
    Price: ${product.price}
    <p className="bg-red-200 text-red-800 font-medium px-2 py-1 inline-block rounded text-sm">
    {product.discountPercentage}% OFF
  </p>
  </h2>
  
  
          </div>
          <span className="text-gray-400 text-sm ml-2">
              ({product.stock} in stock)
            </span>

          <div className="rating flex text-yellow-500 items-center gap-1">
            <FontAwesomeIcon icon={faStar} />
            <h5 className="text-red-500">{product.rating}</h5>
          </div>

          <div className="description flex justify-center">
            <p className="text-gray-700 text-center">{product.description}</p>
          </div>
          {isInCart && (
  <div className="md:col-span-2 flex justify-center items-center">
    <div className="flex items-center gap-2 border px-3 py-1 rounded-full shadow-sm">
      <button
        onClick={() =>
          handleQuantityChange(product.id, cartItems.find((item) => item.id === product.id)?.quantity - 1)
        }
        className="hover:text-red-600 disabled:opacity-30"
        disabled={cartItems.find((item) => item.id === product.id)?.quantity <= 1}
      >
        <FontAwesomeIcon icon={faMinus} />
      </button>
      <span className="min-w-[24px] text-center font-medium">
        {cartItems.find((item) => item.id === product.id)?.quantity || 1}
      </span>
      <button
        onClick={() =>
          handleQuantityChange(product.id, cartItems.find((item) => item.id === product.id)?.quantity + 1)
        }
        className="hover:text-green-600"
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  </div>
)}

          <div className="flex gap-4">
            {isInCart ? (
              <>
                <button
                  onClick={() => navigate("/cart")}
                  className="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-700"
                >
                  Go to Cart
                </button>
                <button
                  onClick={handleRemoveFromCart}
                  className="bg-gray-800 px-4 py-2 text-white rounded hover:bg-black"
                >
                  <FontAwesomeIcon icon={faTrash} /> Remove
                </button>
              </>
            ) : (
              <button
                onClick={handleAddToCart}
                className="bg-red-400 px-4 py-2 text-white rounded hover:bg-red-700"
              >
                Add to Cart
              </button>
            )}

            <button
              onClick={() => dispatch(toggleWishlist(product))}
              className={`text-3xl border px-2 transition-all rounded ${
                isWishlisted
                  ? "text-red-700 border-red-700"
                  : "text-red-100 bg-red-700 hover:bg-red-300"
              }`}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        </div>
      </motion.div>
      
    </div>
    <Review/>
    </>
  );
};

export default Card;
