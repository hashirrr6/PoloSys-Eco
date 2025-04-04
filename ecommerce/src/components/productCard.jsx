import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";

const Card = ({ onUpdateCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setIsWishlisted(wishlist.some((item) => item.id === data.id));
      })
      .catch((err) => console.error("Failed to fetch product", err));
  }, [id]);

  if (!product) return <div className="text-center text-xl">Loading...</div>;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const isInCart = cart.some((item) => item.id === product.id);

  function addToCart() {
    if (!isInCart) {
      const updatedCart = [...cart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      if (onUpdateCart) onUpdateCart(updatedCart);
    }
    navigate("/cart");
  }

  function removeFromCart() {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    if (onUpdateCart) onUpdateCart(updatedCart);
  }

  function toggleWishlist() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (isWishlisted) {
      wishlist = wishlist.filter((item) => item.id !== product.id);
    } else {
      wishlist.push(product);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    setIsWishlisted(!isWishlisted);
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="product grid grid-cols-2 gap-8 items-center p-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
    <motion.div
  className="image border p-4 rounded-lg shadow-lg"
  whileHover={{ scale: 0.8, boxShadow: "0px 10px 20px rgba(255, 0, 0, 0.3)" }}
>
  <img src={product.thumbnail} alt={product.title} className="w-[600px] h-[600px] object-cover rounded-lg" />
</motion.div>

        <div className="details flex flex-col space-y-4 justify-center items-center gap-8">
          <div className="title flex flex-col items-center">
            <h2 className="text-2xl font-bold">{product.title}</h2>
            <h4 className="text-gray-500">Brand: {product.brand}</h4>
          </div>
          <div className="price">
            <h2 className="text-2xl font-semibold">Price: ${product.price}</h2>
          </div>
          <div className="rating flex text-yellow-500">
            <i className="fa-solid fa-star mr-1"></i>
            <h5 className="text-red-500">{product.rating}</h5>
          </div>
          <div className="description flex justify-center">
            <p className="text-gray-700 text-center">{product.description}</p>
          </div>

          <div className="flex gap-4">
            {isInCart ? (
              <>
                <button onClick={() => navigate("/cart")} className="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-700">
                  Go to Cart
                </button>
                <button onClick={removeFromCart} className="bg-gray-800 px-4 py-2 text-white rounded hover:bg-black">
                  <FontAwesomeIcon icon={faTrash} /> Remove
                </button>
              </>
            ) : (
              <button onClick={addToCart} className="bg-red-400 px-4 py-2 text-white rounded hover:bg-red-700">
                Add to Cart
              </button>
            )}

            <button
              onClick={toggleWishlist}
              className={`text-3xl border px-2 transition-all ${
                isWishlisted ? "text-red-700" : "text-red-100 bg-red-700 hover:bg-red-300"
              }`}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Card;
