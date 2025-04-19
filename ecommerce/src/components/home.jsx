import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep, faForwardStep } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import Filter from "./filter";
import { toast } from "react-toastify";

const ITEMS_PER_PAGE = 8;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
  const [sortOption, setSortOption] = useState("");
  
  const [filters, setFilters] = useState({
    selectedCategories: [],
    maxPrice: 500,
    offersOnly: false
  });

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch products");
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

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filters.selectedCategories.length === 0 || 
      filters.selectedCategories.some(cat => product.category.toLowerCase().includes(cat.toLowerCase()));
    const matchesPrice = product.price <= filters.maxPrice;
    const matchesOffers = !filters.offersOnly || product.discountPercentage > 0;
    
    return matchesSearch && matchesCategory && matchesPrice && matchesOffers;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [sortOption, filters, searchQuery]);

  let sortedProducts = [...filteredProducts];
  if (sortOption === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "rating-desc") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  if (loading) return <div className="text-center py-20">Loading products...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

  return (
    <div className="relative pb-10">
      {/* Search Bar */}
      <motion.div
        className="relative flex items-center w-full max-w-md mt-6 mx-auto"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
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

      {/* Filter and Sort Controls */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center mt-6 px-4 mx-auto gap-4">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-red-600 text-white px-4 py-2 rounded shadow-md hover:bg-red-700 transition-colors"
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>
        
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="font-medium text-gray-700 whitespace-nowrap">Sort by:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating</option>
          </select>
        </div>
      </div>

      {/* Filter Section - Auto-closes on apply */}
      {showFilter && (
        <div className="w-full max-w-5xl mx-auto mt-4 animate-fadeIn">
          <Filter
            isOpen={showFilter}
            onClose={() => setShowFilter(false)}
            onApply={(newFilters) => {
              setFilters(newFilters);
              setCurrentPage(1);
              setShowFilter(false); // Auto-hide after applying
            }}
            initialFilters={filters}
          />
        </div>
      )}

      {/* Product Grid */}
      {currentProducts.length > 0 ? (
        <motion.div
          key={`${currentPage}-${JSON.stringify(filters)}`}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 m-6 place-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-gray-600">No products match your filters.</p>
          <button 
            onClick={() => {
              setFilters({
                selectedCategories: [],
                maxPrice: 500,
                offersOnly: false
              });
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6 mb-10">
          <button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-md bg-red-400 text-white hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <FontAwesomeIcon icon={faBackwardStep} />
          </button>
          <span className="text-lg font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-400 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <FontAwesomeIcon icon={faForwardStep} />
          </button>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { margin: "-100px 0px" });

  const handleAddToCart = () => {
    const isInCart = cartItems.some((item) => item.id === product.id);
    if (!isInCart) {
      dispatch(addToCart({ ...product, quantity: 1 }));
      toast.success(`${product.title} added to cart!`);
    } else {
      toast.error(`${product.title} is already in your cart.`);
    }
  };

  return (
    <motion.div
      ref={ref}
      className="w-72 min-h-[450px] h-auto rounded-xl p-4 cursor-pointer flex flex-col justify-between"
      initial={{ opacity: 0, y: 90 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -90 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="flex flex-col items-center p-4 rounded-xl shadow-lg h-full hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.03 }}
      >
        <Link to={`/card/${product.id}`} className="flex flex-col items-center w-full h-full">
          <motion.img
            src={product.thumbnail}
            alt={product.title}
            className="w-40 h-40 object-contain rounded-md mb-4"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <h2 className="font-bold text-lg text-center mt-3 min-h-[48px] line-clamp-2">
            {product.title}
          </h2>
          <h6 className="text-gray-700 font-serif min-h-[24px] mt-1">Brand: {product.brand}</h6>
          <p className="text-sm text-gray-600 text-center min-h-[60px] mt-3">
  {product.description.length > 25
    ? `${product.description.slice(0, 25)}...`
    : product.description}
</p>
          <div className="flex items-center justify-center w-full ">
  <div className="flex items-center gap-2">
    {product.discountPercentage > 0 && (
      <>
        <span className="text-xs text-gray-500 line-through">
          ${(product.price / (1 - product.discountPercentage/100)).toFixed(2)}
        </span>
    <p className="font-semibold text-gray-800 text-lg">
      ${product.price}
    </p>
        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded ml-2">
          {Math.round(product.discountPercentage)}% off
        </span>
      </>
    )}
  </div>
</div>
          <div className="flex items-center mt-2">
            <p className="text-yellow-500 flex items-center">
              <i className="fa-solid fa-star mr-1"></i>
              {product.rating}
            </p>
           
          </div>
          <span className="text-gray-400 text-sm ml-2">
              ({product.stock} in stock)
            </span>
        </Link>
        <button
          onClick={handleAddToCart}
          className="mt-4 px-4 py-2 bg-red-400 text-white rounded-md w-full hover:bg-red-600 transition-colors"
        >
          Add to Cart
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Home;