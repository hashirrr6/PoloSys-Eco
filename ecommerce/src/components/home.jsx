import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {faBackwardStep,faForwardStep} from "@fortawesome/free-solid-svg-icons"


const ITEMS_PER_PAGE = 8; 

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!filteredProducts.length) return <div>No products found</div>;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative flex items-center w-96 mt-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 rounded-full p-3 pl-10 w-full outline-none shadow-md transition-all duration-300 focus:border-red-500 focus:ring-2 focus:ring-red-300"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); 
          }}
        />
        <i className="fa-solid fa-magnifying-glass absolute left-3 text-gray-500 text-xl"></i>
      </motion.div>

      
      <motion.div
        key={currentPage} 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 place-items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>

   
      <div className="flex justify-center items-center space-x-4 mt-6 mb-6">
      
       
{currentPage > 1 && (
  <button 
    onClick={prevPage} 
    className="px-4 py-2 rounded-md bg-red-400 text-white hover:bg-red-600"
  >
    <FontAwesomeIcon icon={faBackwardStep} />
  </button>
)}


<span className="text-lg font-semibold">{currentPage} / {totalPages}</span>

{currentPage < totalPages && (
  <button 
    onClick={nextPage} 
    className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-400"
  >
    <FontAwesomeIcon icon={faForwardStep} />
  </button>
)}

      </div>
    </div>
  );
};

const ProductCard = ({ product }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { margin: "-100px 0px" });

  return (
    <motion.div
      ref={ref}
      className="w-64 min-h-[450px] h-auto rounded-xl p-4 cursor-pointer flex flex-col justify-between"
      initial={{ opacity: 0, y: 90 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -90 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="flex flex-col items-center p-4 rounded-xl shadow-lg h-full"
        whileHover={{
          scale: 1.1,
          boxShadow:
            "0px 10px 20px rgba(255, 0, 0, 0.3), 0px -10px 20px rgba(0, 255, 0, 0.3), 10px 0px 20px rgba(0, 0, 255, 0.3), -10px 0px 20px rgba(255, 165, 0, 0.3)",
        }}
      >
        <Link to={`/card/${product.id}`} className="flex flex-col items-center w-full h-full">
          <motion.img
            src={product.thumbnail}
            alt={product.title}
            className="w-28 h-28 object-cover rounded-md"
            whileHover={{ scale: 1.5 }}
            transition={{ duration: 0.3 }}
          />

          <h2 className="font-bold text-lg text-center mt-3 min-h-[48px]">
            {product.title.length < 20 ? product.title : `${product.title.slice(0, 20)}...`}
          </h2>
          <h6 className="text-gray-700 font-serif min-h-[24px]">Brand: {product.brand}</h6>
          <p className="text-sm text-gray-600 text-center min-h-[60px]">
            {product.description.length > 40 ? `${product.description.slice(0, 40)}...` : product.description}
          </p>
          <p className="font-semibold text-gray-800 mt-2">Price: ${product.price}</p>
          <p className="text-yellow-500 flex items-center mt-1">
            <i className="fa-solid fa-star mr-1"></i>
            {product.rating}
          </p>

          <motion.button
            className="mt-3 px-4 py-2 bg-red-400 text-white rounded-md w-full"
            whileHover={{ backgroundColor: "#14532d" }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            Add to Cart
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Home;
