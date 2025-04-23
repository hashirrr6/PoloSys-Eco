import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep,faBell,faLocationDot, faForwardStep, faSearch, faFilter, faSort } from "@fortawesome/free-solid-svg-icons";
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
  
  // Updated mobile breakpoints for more granular control
  const [screenSize, setScreenSize] = useState({
    isMobile: window.innerWidth < 480,
    isTablet: window.innerWidth >= 480 && window.innerWidth < 768,
    isDesktop: window.innerWidth >= 768
  });
  
  const [filters, setFilters] = useState({
    selectedCategories: [],
    maxPrice: 500,
    offersOnly: false
  });

  // Enhanced responsive handler for window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isMobile: window.innerWidth < 480,
        isTablet: window.innerWidth >= 480 && window.innerWidth < 768,
        isDesktop: window.innerWidth >= 768
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-t-4 border-red-500 border-solid"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <div className="text-center py-4 px-3 md:py-6 md:px-4 bg-red-50 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-lg md:text-xl font-bold text-red-600 mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-700 text-sm md:text-base">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-3 md:mt-4 px-3 py-1.5 md:px-4 md:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-all text-sm md:text-base"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (<>
  <div className="md:hidden px-4 py-2">
  <div className="flex items-center justify-between">
    {/* Left: Location */}
    <div className="flex items-center gap-2">
      <FontAwesomeIcon icon={faLocationDot} className="text-gray-600" />
      <div className="flex flex-col leading-tight">
        <h5 className="text-xs font-medium">Location</h5>
        <p className="text-xs hover:underline">Kozhikkode, Kerala</p>
      </div>
    </div>

    {/* Right: Bell Icon */}
    <button className="text-gray-600 hover:text-red-600">
      <FontAwesomeIcon icon={faBell} className="text-lg" />
    </button>
  </div>
</div>

    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8 max-w-7xl">
      {/* Header Section - Improved responsiveness */}
    

      {/* Search Bar - More responsive */}
      <motion.div
  className="relative flex justify-center w-full mx-auto mb-4 sm:mb-5 md:mb-6"
  initial={{ y: -20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5, delay: 0.1 }}
>
  {/* Input wrapper with icon inside */}
  <div className="relative w-[80%] sm:w-full max-w-xs sm:max-w-sm md:max-w-md">
    {/* Icon absolutely positioned inside input box */}
    <FontAwesomeIcon
      icon={faSearch}
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm md:text-base pointer-events-none"
    />

    {/* Input with left padding for icon */}
    <input
      type="text"
      placeholder="Search products..."
      className="w-full border border-gray-300 rounded-full py-2 md:py-3 pl-10 pr-3 md:pr-4 outline-none shadow-md transition-all duration-300 focus:border-red-500 focus:ring-2 focus:ring-red-300 text-sm md:text-base text-gray-700"
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
      }}
    />
  </div>
</motion.div>


     {/* Filter and Sort Controls - Redesigned to be inline with responsive widths */}
<div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
  <motion.button
    onClick={() => setShowFilter(!showFilter)}
    className="flex-1 md:flex-none md:w-36 lg:w-44 flex items-center justify-center gap-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-2 rounded-md shadow-md hover:from-red-600 hover:to-red-700 transition-all text-sm md:text-base"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
  >
    <FontAwesomeIcon icon={faFilter} className="text-yellow-100" />
    <span className="ml-1">{showFilter ? "Hide Filters" : " Filters"}</span>
  </motion.button>
  
  <motion.div 
    className="flex-1 md:flex-none md:w-48 lg:w-56"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: 0.2 }}
  >
    <div className="relative w-full">
      <FontAwesomeIcon icon={faSort} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm md:text-base" />
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="appearance-none border border-gray-300 rounded-md pl-8 pr-8 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-300 bg-gradient-to-br from-white to-gray-50 text-gray-700 text-sm md:text-base shadow-md hover:shadow-lg transition-all"
        style={{background: 'linear-gradient(to right bottom, #ffffff, #f9fafb)'}}
      >
        <option value="">Sort</option>
        <option value="price-asc">Price: Low-High</option>
        <option value="price-desc">Price: High-Low</option>
        <option value="rating-desc">Top Rated</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
        <div className="bg-red-500 rounded-full p-1 flex items-center justify-center">
          <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </motion.div>
</div>

      {/* Filter Section */}
      {showFilter && (
        <motion.div 
          className="w-full mb-4 sm:mb-5 md:mb-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Filter
            isOpen={showFilter}
            onClose={() => setShowFilter(false)}
            onApply={(newFilters) => {
              setFilters(newFilters);
              setCurrentPage(1);
              setShowFilter(false);
            }}
            initialFilters={filters}
          />
        </motion.div>
      )}

      {/* Product Grid - Adjusted to show 3 items per row on mobile, 2 on smaller screens */}
      {currentProducts.length > 0 ? (
        <motion.div
          key={`${currentPage}-${JSON.stringify(filters)}`}
          className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-2 xs:gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {currentProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              screenSize={screenSize}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 bg-gray-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <img 
            src="/api/placeholder/150/150" 
            alt="No results" 
            className="mb-3 md:mb-4 opacity-70 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
          />
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-3 md:mb-4 text-center px-4">No products match your filters</p>
          <button 
            onClick={() => {
              setFilters({
                selectedCategories: [],
                maxPrice: 500,
                offersOnly: false
              });
              setSearchQuery("");
            }}
            className="px-4 py-1.5 sm:px-5 sm:py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2 text-sm md:text-base"
          >
            <FontAwesomeIcon icon={faFilter} />
            Reset All Filters
          </button>
        </motion.div>
      )}

      {/* Pagination - More compact for mobile */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 md:gap-3 mt-6 md:mt-8 mb-5 md:mb-8">
          <motion.button 
            onClick={prevPage} 
            disabled={currentPage === 1}
            className="px-2 py-1.5 sm:px-3 sm:py-2 rounded-md bg-red-400 text-white hover:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center text-sm md:text-base"
            whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
            whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
          >
            <FontAwesomeIcon icon={faBackwardStep} />
          </motion.button>
          
          <div className="flex items-center">
            <span className="text-sm md:text-base font-medium px-2 sm:px-3 py-1 bg-gray-100 rounded-md">
              {currentPage}/{totalPages}
            </span>
          </div>
          
          <motion.button 
            onClick={nextPage} 
            disabled={currentPage === totalPages}
            className="px-2 py-1.5 sm:px-3 sm:py-2 rounded-md bg-red-500 text-white hover:bg-red-600 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors flex items-center text-sm md:text-base"
            whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
            whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
          >
            <FontAwesomeIcon icon={faForwardStep} />
          </motion.button>
        </div>
      )}
    </div>
    </>
  );
};

const ProductCard = ({ product, screenSize }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px 0px" });

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the Add to Cart button
    e.stopPropagation();
    
    const isInCart = cartItems.some((item) => item.id === product.id);
    if (!isInCart) {
      dispatch(addToCart({ ...product, quantity: 1 }));
      toast.success(`${product.title} added to cart!`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.warning(`${product.title} is already in your cart.`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  // Calculate the original price
  const originalPrice = product.discountPercentage > 0
    ? (product.price / (1 - product.discountPercentage/100)).toFixed(2)
    : null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <Link to={`/card/${product.id}`} className="block h-full">
        <motion.div
          className=" rounded-lg sm:rounded-xl overflow-hidden shadow-sm sm:shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col"
          whileHover={{ y: -3, scale: 1.01 }}
        >
          {/* Product Image with Discount Badge - Adjusted for mobile */}
          <div className="relative pt-2 px-2 sm:pt-3 sm:px-3 md:pt-4 md:px-4 flex justify-center">
            {product.discountPercentage > 0 && (
              <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-10">
                -{Math.round(product.discountPercentage)}%
              </div>
            )}
            <motion.div 
              className={`h-20 xs:h-24 sm:h-28 md:h-36 lg:h-48 flex items-center justify-center overflow-hidden`}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full object-contain"
              />
            </motion.div>
          </div>
          
          {/* Product Info - Optimized for mobile */}
          <div className="p-2 xs:p-2.5 sm:p-3 md:p-4 flex-grow flex flex-col">
            <div className="flex-grow">
              <div className="flex justify-between items-start mb-0.5 sm:mb-1 md:mb-2">
                <h2 className={`font-bold text-xs xs:text-sm sm:text-base md:text-lg line-clamp-1 sm:line-clamp-2 text-gray-800`}>
                  {product.title}
                </h2>
                <div className="flex items-center bg-yellow-100 px-1 py-0.5 rounded text-xs">
                  <span className="text-yellow-600 mr-0.5">★</span>
                  <span className="font-semibold">{product.rating}</span>
                </div>
              </div>
              {screenSize.isDesktop && (
               <p className="text-xs text-gray-500 mb-0.5 sm:mb-1 md:mb-2 line-clamp-1">Brand: {product.brand}</p> 
              )} 
              {/* Description - Only shown on larger screens */}
              {screenSize.isDesktop && (
  <p className="hidden md:block text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
    {product.description.length > 40
      ? `${product.description.slice(0, 40)}...`
      : product.description}
  </p>
)}

            </div>

            {/* Price and Stock - Simplified for mobile */}
            <div className="mt-0.5 sm:mt-1 md:mt-2">
              <div className="flex items-center gap-1 mb-0.5 sm:mb-1 md:mb-2">
                {originalPrice && (
                  <span className="text-xs text-gray-400 line-through">${originalPrice}</span>
                )}
                <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">${product.price}</span>
              </div>
              
              <div className="flex items-center text-xs text-gray-500 mb-1 sm:mb-2 md:mb-3">
                <span className={product.stock > 10 ? "text-green-600" : "text-orange-500"}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                </span>
              </div>
              
              {/* Add to Cart button - Only visible on tablet and desktop */}
              {(screenSize.isTablet || screenSize.isDesktop) && (
                <motion.button
                  onClick={handleAddToCart}
                  className="w-full py-1 sm:py-1.5 md:py-2 bg-gradient-to-r from-red-400 to-red-500 text-white rounded text-xs sm:text-sm md:text-base font-medium transition-colors hover:from-red-500 hover:to-red-600"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Add to Cart
                </motion.button>
              )}
              
              {/* Mobile mini cart button */}
           
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default Home;